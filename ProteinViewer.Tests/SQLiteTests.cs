using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProteinViewer.Tests
{
    [TestClass]
    public class SQLiteTests
    {
        private SQLiteConnection _connection;

        public SQLiteTests()
        {
            string _sqliteDbName = "proteins.db";

            //Look for database in user's home directory.
            string sqliteDbDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            string sqliteDbPath = System.IO.Path.Combine(sqliteDbDirectory, _sqliteDbName);

            string connectionString = $"Data Source={ sqliteDbPath };Version=3;";

            _connection = new SQLiteConnection(connectionString);
        }

        [TestMethod]
        public void Connect_To_SQLite_database()
        {
            _connection.Open();
            _connection.Close();
       }

        [TestMethod]
        public void SQLite_Run_Command_text()
        {
            _connection.Open();

            string sqltext = "";

            //Create Protein Table
            ////////////////////////////////////////////////////////
            //sqltext = @"CREATE TABLE IF NOT EXISTS Protein(
            //    Name NVARCHAR(50) PRIMARY KEY,
            //    Sequence NVARCHAR(200) NOT NULL,
            //    IsoelectricPoint DECIMAL(10,2) NULL,
            //    MolecularWeight INT NULL,
            //    Description NVARCHAR(150) NOT NULL,
            //    YearDiscovered INT NULL,
            //    DiscoveredBy NVARCHAR(50) NULL
            //);";

            //Remove all test data from table
            /////////////////////////////////////
            sqltext = "Delete from Protein";

            SQLiteCommand _command = new SQLiteCommand(sqltext, _connection);

            _command.ExecuteNonQuery();
            _connection.Close();
        }
    }
}
