function AddProteinViewModel() {
    this.Name = ko.observable(undefined);
    this.NameValid = ko.observable(true);
    this.Sequence = ko.observable(undefined);
    this.SequenceValid = ko.observable(true);
    this.IsoelectricPoint = ko.observable(undefined);
    this.IsoelectricPointValid = ko.observable(true);
    this.MolecularWeight = ko.observable(undefined);
    this.MolecularWeightValid = ko.observable(true);
    this.Description = ko.observable(undefined);
    this.DescriptionValid = ko.observable(true);
    this.YearDiscovered = ko.observable(undefined);
    this.YearDiscoveredValid = ko.observable(true);
    this.DiscoveredBy = ko.observable(undefined);
    this.DiscoveredByValid = ko.observable(true);
    this.validationMsgs = ko.observableArray([]);

    this.ClearValidation = function () {
        this.NameValid(true);
        this.SequenceValid(true);
        this.IsoelectricPointValid(true);
        this.MolecularWeightValid(true);
        this.DescriptionValid(true);
        this.YearDiscoveredValid(true);
        this.DiscoveredByValid(true);
        this.validationMsgs.removeAll();
    }

    this.manualReset = function () {
        //Triggering 'reset' on the form clears out the text from the input boxes, but doesn't
        //update the knockout bindings. There's probably a better way to do this but in the interest
        //of time...

        this.Name("")
        this.Sequence("")
        this.IsoelectricPoint("");
        this.MolecularWeight("");
        this.Description("");
        this.YearDiscovered("");
        this.DiscoveredBy("");
    }

    this.Validate = function () {
        var isValid = true;
        var isSpecified = function (val) { return val !== undefined && val !== ""; };

        this.ClearValidation();

        //Check validation rules
        if (!isSpecified(this.Name())) {
            isValid = false;
            this.validationMsgs.push("Name cannot be empty. ");
            this.NameValid(false);
        }
        if (!isSpecified(this.Sequence())) {
            isValid = false;
            this.validationMsgs.push("Sequence cannot be empty. ");
            this.SequenceValid(false);
        }
        if (!isSpecified(this.Description())) {
            isValid = false;
            this.validationMsgs.push("Description cannot be empty. ");
            this.DescriptionValid(false);
        }
        if (isSpecified(this.IsoelectricPoint()) && isNaN(this.IsoelectricPoint())) {
            isValid = false;
            this.validationMsgs.push("Isoelectric Point must be a number. ");
            this.IsoelectricPointValid(false);
        }
        if (isSpecified(this.YearDiscovered()) && (isNaN(this.YearDiscovered()) || this.YearDiscovered().search('\\.') >= 0)) {
            isValid = false;
            this.validationMsgs.push("Year Discovered must be a whole number. ");
            this.YearDiscoveredValid(false);
        }

        if (isSpecified(this.MolecularWeight())) {
            if (isNaN(this.MolecularWeight())) {
                isValid = false;
                this.validationMsgs.push("Molecular Weight must be a number. ");
                this.MolecularWeightValid(false);
            }
            else {
                this.MolecularWeight(parseInt(this.MolecularWeight()), 10);
            }
        }

        return isValid;
    };
}