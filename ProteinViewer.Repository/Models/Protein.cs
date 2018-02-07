using System.ComponentModel.DataAnnotations;

namespace ProteinViewer.Repository
{
    public class Protein
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Sequence { get; set; }
        public float? IsoelectricPoint { get; set; }
        public int? MolecularWeight { get; set; }
        [Required]
        public string Description { get; set; }
        public int? YearDiscovered { get; set; }
        public string DiscoveredBy { get; set; }
    }
}
