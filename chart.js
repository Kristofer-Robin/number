let chartInstance;
// Function to render the chart
function renderChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.label),
            datasets: [{
                label: 'Filter Values',
                data: data.map(item => item.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function applyFilters() {
    // Get filter values
    const ne = localStorage.getItem('not_equal_name');
    const gte = localStorage.getItem('gte_name');
    const lte = localStorage.getItem('lte_name');
    const eq = localStorage.getItem('equal_name');
    const gt = localStorage.getItem('gt_name');
    const lt = localStorage.getItem('lt_name');
    const filteredData = [
        {label: '=', value: eq ? parseInt(eq) : 0},
        {label: '!=', value: ne ? parseInt(ne) : 0},
        {label: '>', value: gt ? parseInt(gt) : 0},
        {label: '>=', value: gte ? parseInt(gte) : 0},
        {label: '<', value: lt ? parseInt(lt) : 0},
        {label: '<=', value: lte ? parseInt(lte) : 0}
    ];
    // Re-render the chart with filtered data
    renderChart(filteredData);
}
// Render the initial chart with empty data
applyFilters();