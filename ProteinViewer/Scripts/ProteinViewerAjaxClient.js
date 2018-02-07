var ProteinViewerAjaxClient = new function () {
    this.LoadRows = function() {
        return $.ajax({
            type: 'GET',
            url: '/api/Protein'
        });
    };

    //TODO: Eliminate UI dependency here, time permitting.
    //TODO: Add Validation for this call
    this.AddNewRowFromForm = function () {
        return $.ajax({
            type: 'POST',
            url: '/api/Protein/Add',
            data: $("#new-protein-form").serialize()
        });
    }
};

