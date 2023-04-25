document.addEventListener('DOMContentLoaded', function () {
    var operatorOptions = document.getElementsByClassName('operator-option');
    var filterButton = document.querySelector('.btn.btn-outline-secondary.dropdown-toggle');
    for (var i = 0; i < operatorOptions.length; i++) {
        operatorOptions[i].addEventListener('click', function (event) {
            event.preventDefault();
            var selectedFilter = this.textContent;
            var filterValue = this.getAttribute('data-bs-filter-value');
            filterButton.textContent = selectedFilter;
            console.log('Selected filter:', selectedFilter);
            var targetInput = document.getElementById('filter-input');
            targetInput.name = filterValue;
            updateApplyClearButtons();
        });
    }
    var operatorOptionsGtLt = document.getElementsByClassName('operator-option-gtlt');
    for (var i = 0; i < operatorOptionsGtLt.length; i++) {
        operatorOptionsGtLt[i].addEventListener('click', function (event) {
            event.preventDefault();
            var selectedFilter = this.textContent;
            var filterValue = this.getAttribute('data-bs-filter-value');
            var targetButton = document.querySelector(this.dataset.target);
            targetButton.innerHTML = selectedFilter;
            var targetInput = document.getElementById('filter-input-gt');
            targetInput.name = filterValue;
            console.log("Selected Filter:", selectedFilter);
            console.log("Filter Value:", filterValue);
            updateApplyClearButtons();
        });
    }
    var applyButton = document.querySelector('.btn.btn-success.btn-sm');
    var clearButton = document.querySelector('.btn.btn-warning.btn-sm');
    var inputs = document.querySelectorAll('input.form-control');
    applyButton.style.display = 'none';
    clearButton.style.display = 'none';
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', updateApplyClearButtons);
    }
    applyButton.addEventListener('click', function () {
        saveToLocalStorage();
    });
    clearButton.addEventListener('click', function () {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        applyButton.style.display = 'none';
        clearButton.style.display = 'none';
        localStorage.clear();
    });
    loadFromLocalStorage();
    function updateApplyClearButtons() {
        var anyInputHasValue = Array.from(inputs).some(input => input.value.length > 0);
        applyButton.style.display = anyInputHasValue ? 'inline-block' : 'none';
        clearButton.style.display = anyInputHasValue ? 'inline-block' : 'none';
    }
});
function saveToLocalStorage() {
    var inputs = document.querySelectorAll('input.form-control');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('name') !== null) {
            localStorage.setItem(inputs[i].getAttribute('name'), inputs[i].value);
        }
    }
    // Add this line to update the chart when saving the filter values
    applyFilters();
}
function loadFromLocalStorage() {
    var inputs = document.querySelectorAll('input.form-control');
    var hasStoredValues = false;
    for (var i = 0; i < inputs.length; i++) {
        var storedValue = localStorage.getItem(inputs[i].getAttribute('name'));
        if (storedValue !== null) {
            inputs[i].value = storedValue;
            hasStoredValues = true;
        }
    }
    if (hasStoredValues) {
        updateApplyClearButtons();
    }
    function updateApplyClearButtons() {
        var applyButton = document.querySelector('.btn.btn-success.btn-sm');
        var clearButton = document.querySelector('.btn.btn-warning.btn-sm');
        var inputs = document.querySelectorAll('input.form-control');
        var anyInputHasValue = Array.from(inputs).some(input => input.value.length > 0);
        applyButton.style.display = anyInputHasValue ? 'inline-block' : 'none';
        clearButton.style.display = anyInputHasValue ? 'inline-block' : 'none';
    }
}
function updateInputNameAndIdForGtLt(target, value, id) {
    const input = document.querySelector(id);
    input.name = value;
    localStorage.setItem(value, input.value);
}
document.querySelectorAll('.operator-option-gtlt').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.dataset.target;
        const value = e.target.dataset.bsFilterValue;
        const buttonText = e.target.textContent.trim();
        document.querySelector(target).textContent = buttonText;
        const id = target === '#gt-dropdown' ? '#filter-input-gt' : '#filter-input-lt';
        updateInputNameAndIdForGtLt(target, value, id);
    });
});
document.querySelector('.btn-warning').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('filter-input').value = '';
    document.getElementById('filter-input-gt').value = '';
    document.getElementById('filter-input-lt').value = '';
    localStorage.removeItem('equal_name');
    localStorage.removeItem('not_equal_name');
    localStorage.removeItem('gt_name');
    localStorage.removeItem('gte_name');
    localStorage.removeItem('lt_name');
    localStorage.removeItem('lte_name');
    applyFilters();
});