 //   Application Init                       //
//////////////////////////////////////////////
var ViewModel = new ProteinViewerViewModel();
ViewModel.loadProteins();
ko.applyBindings(ViewModel);