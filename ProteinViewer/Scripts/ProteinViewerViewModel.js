function ProteinViewerViewModel() {
    this.addProteinForm = new AddProteinViewModel();
    this.proteins = ko.observableArray([]);
    this.searchText = ko.observable("");
    this.proteinString = ko.observable("");
    this.proteinArray = ko.observableArray([]);
    this.errorMessage = ko.observable("");

    this.addProteinModalVisible = ko.observable(false);
    this.viewSequenceModalVisible = ko.observable(false);
    this.infoModalVisible = ko.observable(false);
    this.errorModalVisible = ko.observable(false);

    this.showErrorModal = function (errorMsg) {
        this.errorMessage(errorMsg || "Unknown Error.");
        this.errorModalVisible(true);
    }
    this.hideErrorModal = function () { this.errorModalVisible(false); }

    this.showInfoModal = function () { this.infoModalVisible(true); }
    this.hideInfoModal = function () { this.infoModalVisible(false);}

    this.showAddProteinModal = function () {
        this.addProteinForm.manualReset();
        this.addProteinModalVisible(true);
    }
    this.hideAddProteinModal = function () { this.addProteinModalVisible(false); }

    this.showSequenceModal = function (item) {
        var self = this;
        self.proteinArray.removeAll();

        if (self.searchText() !== undefined && self.searchText() !== "") {
            var proteinHighlight = CreateProteinHighlight(item.Sequence, self.searchText())
        }
        else {
            var proteinHighlight = item.Sequence.split('').map(function (char) {
                return { char: char, highlighted: false };
            })
        }
        proteinHighlight.forEach(function (char) {
            //An easier way for this?
            self.proteinArray.push(char);
        })

        self.viewSequenceModalVisible(true);
        document.getElementById('hide-sequence-button').focus();
    }.bind(this);
    this.hideSequenceModal = function () { this.viewSequenceModalVisible(false); }


    this.updateSearch = function () {
        var str = this.searchText().toLowerCase();

        this.proteins().forEach(function (protein) {
            if (protein.Name.toLowerCase().search(str) >= 0 ||
                protein.Description.toLowerCase().search(str) >= 0 ||
                (protein.DiscoveredBy && protein.DiscoveredBy.toLowerCase().search(str) >= 0)) {
                protein.isVisible(true);
            }
            else if (ProteinSearch.search(protein, str)){
                protein.isVisible(true);
            }
            else {
                protein.isVisible(false);
            }
        });
    };

    this.addProteinSubmit = function (viewModel, event) {
        var self = this;
        event.preventDefault();
        var formIsValid = this.addProteinForm.Validate();
        if (formIsValid) {
            ProteinViewerAjaxClient.AddNewRowFromForm()
               .done(function () {
                    self.loadProteins();
                    self.addProteinModalVisible(false);
                    self.addProteinForm.ClearValidation();
                    document.getElementById("new-protein-form").reset();
               })
               .fail(function (data, status, error) {
                   console.log(data);
                   self.showErrorModal(data.responseJSON.ExceptionMessage);
               });
        }
    }
    this.loadProteins = function () {
        var loadProteinsCallback = function (newProteins) {
            var self = this;

            self.proteins.removeAll();
            newProteins.forEach(function (protein) {
                protein.isVisible = ko.observable(true);
                //Adds proteins to 'observablearray' one item at a time.
                //HOW TO ADD ALL AT ONCE?
                self.proteins.push(protein);
            });
        }.bind(this);

        ProteinViewerAjaxClient
                .LoadRows()
                .done(loadProteinsCallback)
                .fail(function (data, status, error) {
                    self.showErrorModal(data.responseJSON.ExceptionMessage);
                });
    }

}
