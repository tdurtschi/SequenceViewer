using Insight.Database;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProteinViewer.Repository
{
    public class ProteinRepository
    {
        //SQLite connection
        private SQLiteConnection _connection;
        private const string _sqliteDbName = "proteins.db";

        public ProteinRepository()
        {
            //User folder
            string sqliteDbDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            string sqliteDbPath = System.IO.Path.Combine(sqliteDbDirectory, _sqliteDbName);

            string connectionString = $"Data Source={ sqliteDbPath };Version=3;";

            _connection = new SQLiteConnection(connectionString);

            //Handle db setup if this is the first run
            if (!proteinTableExists())
            {
                setupDb();
            }
        }

        public IList<Protein> LoadAll()
        {
            _connection.Open();

            IList<Protein> proteins = _connection.QuerySql<Protein>("Select * from Protein").ToArray();

            _connection.Close();

            return proteins;
        }

        public void Add(Protein protein)
        {
            _connection.Open();

            if (nameIsUnique(protein.Name))
            {
                executeAddProteinSql(protein);
            }
            else
            {
                _connection.Close();
                throw new SQLiteException(SQLiteErrorCode.Constraint_Unique, "\"Name\" must be unique.");
            }

            _connection.Close();
        }

        public void Add(Protein[] proteins)
        {
            _connection.Open();

            foreach(Protein protein in proteins)
            {
                executeAddProteinSql(protein);
            }

            _connection.Close();
        }

        private bool nameIsUnique(string name)
        {
            IList<Protein> proteins = _connection.QuerySql<Protein>("Select * from Protein where Name like @Name", 
                new { Name = name }).ToArray();

            return !proteins.Any();
        }

        private void executeAddProteinSql(Protein protein)
        {
            _connection.QuerySql(@"Insert Into Protein (
                    Name,
                    Sequence,
                    IsoelectricPoint,
                    MolecularWeight,
                    Description,
                    YearDiscovered,
                    DiscoveredBy) 
                Values (
                    @Name, 
                    @Sequence, 
                    @IsoelectricPoint, 
                    @MolecularWeight, 
                    @Description, 
                    @YearDiscovered, 
                    @DiscoveredBy)", protein);
        }
        private bool proteinTableExists()
        {
            try
            {
                _connection.Open();
                _connection.QuerySql<string>("Select Name from Protein");
                _connection.Close();
                return true;
            }
            catch(Exception ex)
            {
                _connection.Close();
                return false;
            }
        }

        public void setupDb()
        {
            _connection.Open();
            string createProteinTableQuery = @"CREATE TABLE IF NOT EXISTS Protein(
                Name NVARCHAR(50) PRIMARY KEY,
                Sequence NVARCHAR(200) NOT NULL,
                IsoelectricPoint DECIMAL(10,2) NULL,
                MolecularWeight INT NULL,
                Description NVARCHAR(150) NOT NULL,
                YearDiscovered INT NULL,
                DiscoveredBy NVARCHAR(50) NULL
            );";
            _connection.QuerySql(createProteinTableQuery);
            _connection.Close();
        }
    }
}
