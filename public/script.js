// --- DATA MODEL ---
const getInitialSpecies = () => [
    // Beneficiosas (8)
    { id: 0, name: 'Bifidobacterium longum', emoji: '🌿', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(75, 192, 192, 1)', description: 'Digiere fibras y ayuda a mantener un sistema inmunitario saludable.' },
    { id: 1, name: 'Faecalibacterium prausnitzii', emoji: '🌾', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(54, 162, 235, 1)', description: 'Gran productora de butirato, un compuesto antiinflamatorio clave para la salud del colon.' },
    { id: 2, name: 'Akkermansia muciniphila', emoji: '🛡️', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(117, 204, 133, 1)', description: 'Fortalece la barrera intestinal y se asocia con una buena salud metabólica.' },
    { id: 3, name: 'Roseburia spp.', emoji: '🌹', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(0, 150, 136, 1)', description: 'Otro importante productor de butirato a partir de la fermentación de fibra.' },
    { id: 4, name: 'Lactobacillus rhamnosus', emoji: '🥛', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(153, 204, 255, 1)', description: 'Conocido probiótico que ayuda en la digestión y modula el sistema inmunitario.' },
    { id: 5, name: 'Bifidobacterium bifidum', emoji: '👶', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(102, 153, 204, 1)', description: 'Una de las primeras bacterias en colonizar el intestino humano, importante para la digestión de la leche.' },
    { id: 6, name: 'Prevotella copri', emoji: '🌽', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(255, 218, 128, 1)', description: 'Experta en descomponer carbohidratos complejos y fibra, común en dietas ricas en vegetales.' },
    { id: 7, name: 'Parabacteroides distasonis', emoji: '🧩', role: 'Beneficiosa', type: 'beneficial', abundance: 5, color: 'rgba(144, 238, 144, 1)', description: 'Produce succinato y ácidos grasos que contribuyen a la salud intestinal y metabólica.' },
    // Oportunistas (8)
    { id: 8, name: 'Bilophila wadsworthia', emoji: '🍔', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(255, 206, 86, 1)', description: 'Prospera con dietas altas en grasas y su sobrecrecimiento está relacionado con la inflamación.' },
    { id: 9, name: 'Enterococcus faecalis', emoji: '🔥', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(255, 99, 132, 1)', description: 'Puede causar problemas si el ecosistema se desequilibra, especialmente tras el uso de antibióticos.' },
    { id: 10, name: 'Clostridioides difficile', emoji: '☠️', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(255, 159, 64, 1)', description: 'Su sobrecrecimiento puede causar infecciones severas, especialmente en entornos hospitalarios.' },
    { id: 11, name: 'Fusobacterium nucleatum', emoji: '💣', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(211, 84, 0, 1)', description: 'Asociada a inflamación de las encías y se ha implicado en enfermedades intestinales más serias.' },
    { id: 12, name: 'Escherichia coli (patógena)', emoji: '🤢', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(255, 102, 102, 1)', description: 'Aunque muchas cepas son inofensivas, algunas pueden causar infecciones y producir toxinas.' },
    { id: 13, name: 'Streptococcus spp.', emoji: '🔴', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(220, 53, 69, 1)', description: 'Un grupo grande de bacterias, algunas de las cuales pueden causar infecciones si crecen sin control.' },
    { id: 14, name: 'Clostridium perfringens', emoji: '💥', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(191, 10, 48, 1)', description: 'Causa común de intoxicación alimentaria y puede producir gangrena gaseosa en heridas.' },
    { id: 15, name: 'Enterobacter cloacae', emoji: '🏥', role: 'Oportunista', type: 'opportunistic', abundance: 5, color: 'rgba(139, 0, 0, 1)', description: 'Conocido por causar infecciones en pacientes hospitalizados o con sistemas inmunitarios debilitados.' },
    // Neutrales/Generalistas (4)
    { id: 16, name: 'Bacteroides thetaiotaomicron', emoji: '🔧', role: 'Generalista', type: 'neutral', abundance: 5, color: 'rgba(153, 102, 255, 1)', description: 'Un "generalista" muy adaptable, experto en descomponer una amplia variedad de carbohidratos.' },
    { id: 17, name: 'Methanobrevibacter smithii', emoji: '💨', role: 'Arquea (Metano)', type: 'neutral', abundance: 5, color: 'rgba(149, 165, 166, 1)', description: 'No es una bacteria, sino una arquea. Consume hidrógeno y produce metano, ayudando a otros microbios.' },
    { id: 18, name: 'Ruminococcus spp.', emoji: '🍃', role: 'Generalista', type: 'neutral', abundance: 5, color: 'rgba(46, 204, 113, 1)', description: 'Importante para descomponer celulosa y otros polisacáridos vegetales resistentes.' },
    { id: 19, name: 'Alistipes spp.', emoji: '🤔', role: 'Generalista', type: 'neutral', abundance: 5, color: 'rgba(128, 128, 128, 1)', description: 'Su rol es complejo y aún se investiga; puede ser tanto beneficioso como problemático según el contexto.' }
];

// --- STATE MANAGEMENT ---
let currentSpecies = getInitialSpecies();
let month = 0;
let doughnutChart, lineChart;
let history = [];
let markdownConverter = new showdown.Converter();
let lastAnalysisResult = '';

// --- DOM ELEMENTS ---
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
const lineCtx = document.getElementById('lineChart').getContext('2d');
const simulateBtn = document.getElementById('simulate-btn');
const resetBtn = document.getElementById('reset-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const dietSelect = document.getElementById('diet-select');
const monthCounter = document.getElementById('month-counter');
const balanceStatus = document.getElementById('balance-status');
const speciesDetailsContainer = document.getElementById('species-details');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalTextContent = document.getElementById('modal-text-content');
const closeModalBtn = document.getElementById('close-modal-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const mealPlanSection = document.getElementById('meal-plan-section');
const generateMealPlanBtn = document.getElementById('generate-meal-plan-btn');
const mealPlanLoadingSpinner = document.getElementById('meal-plan-loading-spinner');
const mealPlanResponse = document.getElementById('meal-plan-response');

// --- MODAL FUNCTIONS ---
function openModal() {
    modalBackdrop.classList.add('show');
    modalContainer.classList.add('show');
}

function closeModal() {
    mealPlanSection.classList.add('hidden');
    mealPlanResponse.innerHTML = '';
    lastAnalysisResult = '';
    modalBackdrop.classList.remove('show');
    modalContainer.classList.remove('show');
}

function showSpeciesInfoModal(species) {
    modalTitle.innerHTML = `${species.emoji} ${species.name}`;
    modalTextContent.innerHTML = `<p class="text-lg">${species.description}</p>`;
    loadingSpinner.classList.add('hidden');
    modalTextContent.classList.remove('hidden');
    mealPlanSection.classList.add('hidden');
    openModal();
}

// --- CHARTING FUNCTIONS ---
function createDoughnutChart() {
    if (doughnutChart) doughnutChart.destroy();
    doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: currentSpecies.map(s => `${s.emoji} ${s.name}`),
            datasets: [{
                data: currentSpecies.map(s => s.abundance),
                backgroundColor: currentSpecies.map(s => s.color.replace('1)', '0.8)')),
                borderColor: currentSpecies.map(s => s.color),
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
}

function createLineChart() {
    if (lineChart) lineChart.destroy();
    const datasets = history[0].map((species, index) => ({
        label: `${species.emoji} ${species.name}`,
        data: getHistoryForSpecies(index),
        borderColor: species.color,
        backgroundColor: species.color.replace('1)', '0.3)'),
        fill: true, tension: 0.2, borderWidth: 2, pointRadius: 0, pointHoverRadius: 5
    }));
    const labels = history.map((_, i) => `Mes ${i}`);

    lineChart = new Chart(lineCtx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: { stacked: false, beginAtZero: true, title: { display: true, text: 'Abundancia (%)' }, ticks: { color: '#6B7280' } },
                x: { title: { display: true, text: 'Tiempo (Meses)' }, ticks: { color: '#6B7280' } }
            },
            plugins: { 
                legend: { 
                    position: 'bottom',
                    labels: { color: document.body.classList.contains('dark') ? '#E5E7EB' : '#4B5563', boxWidth: 20, padding: 15 },
                    onClick: (e, legendItem, legend) => {
                        const index = legendItem.datasetIndex;
                        const ci = legend.chart;
                        if (ci.isDatasetVisible(index)) {
                            ci.hide(index);
                            legendItem.hidden = true;
                        } else {
                            ci.show(index);
                            legendItem.hidden = false;
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const currentValue = context.parsed.y;
                            let trendIndicator = '';
                            if (context.dataIndex > 0) {
                                const previousValue = context.dataset.data[context.dataIndex - 1];
                                if (currentValue > previousValue + 0.01) trendIndicator = ' (▲)';
                                else if (currentValue < previousValue - 0.01) trendIndicator = ' (▼)';
                            }
                            return `${label}: ${currentValue.toFixed(1)}%${trendIndicator}`;
                        },
                        labelTextColor: function(context) {
                            if (context.dataIndex > 0) {
                                const currentValue = context.parsed.y;
                                const previousValue = context.dataset.data[context.dataIndex - 1];
                                if (currentValue > previousValue + 0.01) return '#28a745';
                                else if (currentValue < previousValue - 0.01) return '#dc3545';
                            }
                            return document.body.classList.contains('dark') ? '#E5E7EB' : '#4B5563';
                        }
                    }
                }
            }
        }
    });
}

// --- UI UPDATE FUNCTIONS ---
function updateSpeciesDetails() {
    speciesDetailsContainer.innerHTML = '';
    currentSpecies.forEach(species => {
        const card = document.createElement('div');
        card.className = 'species-card flex-grow bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm';
        card.addEventListener('click', () => showSpeciesInfoModal(species));
        card.innerHTML = `
            <div class="flex items-center">
                <span class="text-3xl mr-3">${species.emoji}</span>
                <div>
                    <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-100">${species.name}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${species.role}</p>
                    <p class="font-bold text-lg" style="color:${species.color}">${species.abundance.toFixed(1)}%</p>
                </div>
            </div>
        `;
        speciesDetailsContainer.appendChild(card);
    });
}

function updateBalanceStatus() {
    const abundances = currentSpecies.map(s => s.abundance);
    const maxAbundance = Math.max(...abundances);
    const minAbundance = Math.min(...abundances);
    if (maxAbundance - minAbundance < 5) {
        balanceStatus.textContent = 'Perfecto';
        balanceStatus.className = 'font-semibold text-green-500';
    } else if (maxAbundance - minAbundance < 15) {
        balanceStatus.textContent = 'Alterado';
        balanceStatus.className = 'font-semibold text-yellow-500';
    } else {
        balanceStatus.textContent = 'Muy Desbalanceado';
        balanceStatus.className = 'font-semibold text-red-500';
    }
}

function updateAllUI() {
    doughnutChart.data.datasets[0].data = currentSpecies.map(s => s.abundance);
    doughnutChart.update();
    const globalMax = getGlobalMaxAbundance();
    const yAxisMax = Math.max(10, Math.ceil((globalMax + 2) / 5) * 5); 
    if (lineChart.options.scales.y.max !== yAxisMax) {
        lineChart.options.scales.y.max = yAxisMax;
    }
    lineChart.data.labels = history.map((_, i) => `Mes ${i}`);
    lineChart.data.datasets.forEach((dataset, index) => {
        dataset.data = getHistoryForSpecies(index);
    });
    lineChart.update();
    updateSpeciesDetails();
    updateBalanceStatus();
    monthCounter.textContent = month;
}

// --- SIMULATION LOGIC ---
function simulateMonth() {
    month++;
    const diet = dietSelect.value;
    let totalLoss, totalGain;
    switch(diet) {
        case 'industrialized':
            totalLoss = 0;
            currentSpecies.forEach(s => {
                if (s.type === 'beneficial' && s.abundance > 0.5) {
                    const loss = s.abundance * 0.15;
                    s.abundance -= loss;
                    totalLoss += loss;
                }
            });
            const opportunisticSpecies = currentSpecies.filter(s => s.type === 'opportunistic');
            const gainPerOpportunistic = totalLoss / opportunisticSpecies.length;
            currentSpecies.forEach(s => {
                if (s.type === 'opportunistic') s.abundance += gainPerOpportunistic;
            });
            break;
        case 'mediterranean':
            const average = 5;
            currentSpecies.forEach(s => {
                s.abundance += (average - s.abundance) * 0.1 + (Math.random() - 0.5) * 0.2;
            });
            break;
        case 'keto':
            totalLoss = 0;
            let fatLoverGain = 0;
            currentSpecies.forEach(s => {
                if ((s.name.includes('Bifido') || s.name.includes('Faecali') || s.name.includes('Roseburia') || s.name.includes('Prevotella')) && s.abundance > 0.5) {
                    const loss = s.abundance * 0.25;
                    s.abundance -= loss;
                    totalLoss += loss;
                }
            });
            currentSpecies.forEach(s => {
                if (s.name.includes('Bilophila')) {
                   const gain = totalLoss * 0.7;
                   s.abundance += gain;
                   fatLoverGain = gain;
                }
            });
            const remainingGain = totalLoss - fatLoverGain;
            const otherOpportunists = currentSpecies.filter(s => s.type === 'opportunistic' && !s.name.includes('Bilophila'));
            const gainPerOther = remainingGain / otherOpportunists.length;
            currentSpecies.forEach(s => {
                if (s.type === 'opportunistic' && !s.name.includes('Bilophila')) s.abundance += gainPerOther;
            });
            break;
        case 'vegan':
            totalGain = 0;
            currentSpecies.forEach(s => {
                if (s.type === 'beneficial' && (s.name.includes('Prevotella') || s.name.includes('Bifido'))) {
                    const gain = s.abundance * 0.20;
                    s.abundance += gain;
                    totalGain += gain;
                }
            });
            const opportunistsToReduce = currentSpecies.filter(s => s.name.includes('Bilophila') || s.name.includes('Clostridium perfringens'));
            const lossPerOpportunist = totalGain / opportunistsToReduce.length;
            currentSpecies.forEach(s => {
                 if ((s.name.includes('Bilophila') || s.name.includes('Clostridium perfringens')) && s.abundance > 0.5) {
                    s.abundance -= lossPerOpportunist;
                 }
            });
            break;
    }
    const totalAbundance = currentSpecies.reduce((sum, s) => sum + s.abundance, 0);
    const scaleFactor = 100 / totalAbundance;
    currentSpecies.forEach(s => {
        s.abundance = Math.max(0.1, s.abundance * scaleFactor);
    });
    const finalTotalAbundance = currentSpecies.reduce((sum, s) => sum + s.abundance, 0);
    const finalScaleFactor = 100 / finalTotalAbundance;
    currentSpecies.forEach(s => s.abundance *= finalScaleFactor);
    recordHistory();
    updateAllUI();
}

// --- HISTORY MANAGEMENT & HELPERS ---
function recordHistory() {
     history.push(JSON.parse(JSON.stringify(currentSpecies)));
}
function getHistoryForSpecies(speciesId) {
    return history.map(state => state[speciesId].abundance);
}
function getGlobalMaxAbundance() {
    if (!history || history.length === 0) return 5;
    let max = 0;
    history.forEach(monthData => {
        monthData.forEach(species => {
            if (species.abundance > max) max = species.abundance;
        });
    });
    return max;
}

// --- API CALLS TO OUR BACKEND ---
async function fetchFunction(functionPath, options = {}) {
    let response = await fetch(`/.netlify/functions/${functionPath}`, options);

    if (response.status === 404) {
        response = await fetch(`/api/${functionPath}`, options);
    }

    return response;
}

async function postToFunction(functionName, payload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetchFunction(functionName, requestOptions);
}

function generateRequestId() {
    if (window.crypto?.randomUUID) {
        return window.crypto.randomUUID();
    }
    return `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function waitForAnalysisResult(requestId, { timeoutMs = 120000, intervalMs = 2000 } = {}) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
        const response = await fetchFunction(`analyze-status?requestId=${encodeURIComponent(requestId)}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al consultar el estado del análisis: ${errorText}`);
        }

        const statusPayload = await response.json();

        if (statusPayload.status === 'complete') {
            return statusPayload.result;
        }

        if (statusPayload.status === 'error') {
            throw new Error(statusPayload.message || 'La función de análisis reportó un error.');
        }

        await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    throw new Error('La solicitud de análisis tardó demasiado tiempo en completarse.');
}

async function callGeminiForAnalysis() {
    modalTitle.innerText = "✨ Análisis del Microbioma por IA";
    modalTextContent.innerHTML = '';
    modalTextContent.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    mealPlanSection.classList.add('hidden');
    mealPlanResponse.innerHTML = '';
    openModal();

    const speciesDataString = currentSpecies.map(s => `- ${s.name} (${s.role}): ${s.abundance.toFixed(1)}%`).join('\n');
    const requestId = generateRequestId();

    try {
        const response = await postToFunction('analyze', { speciesData: speciesDataString, requestId });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor: ${errorText}`);
        }

        const result = await waitForAnalysisResult(requestId);

        if (result.candidates && result.candidates.length > 0) {
            lastAnalysisResult = result.candidates[0].content.parts[0].text;
            modalTextContent.innerHTML = markdownConverter.makeHtml(lastAnalysisResult);
            mealPlanSection.classList.remove('hidden');
        } else {
             modalTextContent.innerHTML = "<p>No se pudo obtener una respuesta de la IA. La respuesta no tuvo el formato esperado.</p>";
        }
    } catch (error) {
        console.error("Error al llamar al backend:", error);
        modalTextContent.textContent = `Ocurrió un error al contactar al servicio de análisis: ${error.message}`;
    } finally {
        loadingSpinner.classList.add('hidden');
        modalTextContent.classList.remove('hidden');
    }
}

async function callGeminiForMealPlan() {
    mealPlanLoadingSpinner.classList.remove('hidden');
    generateMealPlanBtn.disabled = true;

    try {
        const response = await postToFunction('meal-plan', { lastAnalysis: lastAnalysisResult });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor: ${errorText}`);
        }
        
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0) {
            const markdownText = result.candidates[0].content.parts[0].text;
            mealPlanResponse.innerHTML = markdownConverter.makeHtml(markdownText);
        } else {
            mealPlanResponse.textContent = "No se pudo generar el plan de comidas.";
        }
    } catch (error) {
        console.error("Error al generar el plan de comidas:", error);
        mealPlanResponse.textContent = `Ocurrió un error: ${error.message}`;
    } finally {
        mealPlanLoadingSpinner.classList.add('hidden');
        generateMealPlanBtn.disabled = false;
    }
}

// --- INITIALIZATION AND EVENT LISTENERS ---
function reset() {
    month = 0;
    currentSpecies = getInitialSpecies();
    history = [];
    recordHistory();
    createDoughnutChart();
    createLineChart();
    updateAllUI();
}

window.addEventListener('load', reset);
simulateBtn.addEventListener('click', simulateMonth);
resetBtn.addEventListener('click', reset);
analyzeBtn.addEventListener('click', callGeminiForAnalysis);
generateMealPlanBtn.addEventListener('click', callGeminiForMealPlan);
closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
