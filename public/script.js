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
const richnessCounter = document.getElementById('richness-counter'); 


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
    // Si la abundancia es 0, no mostrar la descripción.
    const abundanceText = species.abundance.toFixed(1) > 0.05 
        ? `<p class="text-lg">${species.description}</p>`
        : `<p class="text-lg text-red-500">Esta especie está por debajo del umbral de detección (0.5%) y ha sido considerada perdida del ecosistema.</p>`;
        
    modalTextContent.innerHTML = abundanceText;
    loadingSpinner.classList.add('hidden');
    modalTextContent.classList.remove('hidden');
    mealPlanSection.classList.add('hidden');
    openModal();
}

// --- CHARTING FUNCTIONS ---
function createDoughnutChart() {
    if (doughnutChart) doughnutChart.destroy();
    
    // Filtrar especies con abundancia > 0.05 para el gráfico de dona
    const activeSpecies = currentSpecies.filter(s => s.abundance > 0.05);

    doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: activeSpecies.map(s => `${s.emoji} ${s.name}`),
            datasets: [{
                data: activeSpecies.map(s => s.abundance),
                backgroundColor: activeSpecies.map(s => s.color.replace('1)', '0.8)')),
                borderColor: activeSpecies.map(s => s.color),
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
        // Ocultar especies que están a 0%
        if (species.abundance < 0.05) return; 

        const card = document.createElement('div');
        card.className = 'species-card flex-grow bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm';
        card.addEventListener('click', () => showSpeciesInfoModal(species));
        
        // Estilo especial si la abundancia es muy baja pero no cero (entre 0.05 y 0.5)
        const abundanceColor = species.abundance < 0.5 
            ? 'text-yellow-500' 
            : `style="color:${species.color}"`;

        card.innerHTML = `
            <div class="flex items-center">
                <span class="text-3xl mr-3">${species.emoji}</span>
                <div>
                    <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-100">${species.name}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${species.role}</p>
                    <p class="font-bold text-lg ${abundanceColor}">${species.abundance.toFixed(1)}%</p>
                </div>
            </div>
        `;
        speciesDetailsContainer.appendChild(card);
    });
}

function updateBalanceStatus() {
    // 1. Calcular Scores Biológicos
    const fPrausnitzii = currentSpecies.find(s => s.name === 'Faecalibacterium prausnitzii')?.abundance || 0;
    const roseburia = currentSpecies.find(s => s.name === 'Roseburia spp.')?.abundance || 0;
    const bilophila = currentSpecies.find(s => s.name === 'Bilophila wadsworthia')?.abundance || 0;
    const fusobacterium = currentSpecies.find(s => s.name === 'Fusobacterium nucleatum')?.abundance || 0;

    // Score de AGCC (Butirato-productores) - Ideal alto
    const agccScore = fPrausnitzii + roseburia; 
    // Score de Inflamación - Ideal bajo
    const inflammationScore = bilophila + fusobacterium; 

    // 2. Determinar Balance General
    const totalBeneficial = currentSpecies
        .filter(s => s.type === 'beneficial')
        .reduce((sum, s) => sum + s.abundance, 0);

    const totalOpportunistic = currentSpecies
        .filter(s => s.type === 'opportunistic')
        .reduce((sum, s) => sum + s.abundance, 0);
        
    const beneficialShare = totalBeneficial / (totalBeneficial + totalOpportunistic);

    // 3. Aplicar Nuevos Estados de Balance
    if (agccScore > 15 && inflammationScore < 5) {
        balanceStatus.textContent = 'Perfecto (Alta Producción AGCC)';
        balanceStatus.className = 'font-semibold text-green-500';
    } else if (beneficialShare >= 0.6) {
        balanceStatus.textContent = 'Balanceado a especies benéficas';
        balanceStatus.className = 'font-semibold text-blue-500';
    } else if (beneficialShare > 0.4) {
        balanceStatus.textContent = 'Neutro (Requiere Promoción)';
        balanceStatus.className = 'font-semibold text-yellow-500';
    } else {
        balanceStatus.textContent = 'Desbalanceado a especies oportunistas';
        balanceStatus.className = 'font-semibold text-red-500';
    }
}

function updateRichness() {
    // La riqueza es el conteo de especies con abundancia detectable (> 0.05%)
    const activeSpeciesCount = currentSpecies.filter(s => s.abundance > 0.05).length;
    const richnessElement = document.getElementById('richness-counter');
    if (richnessElement) {
        richnessElement.textContent = `${activeSpeciesCount} Especies`;
    }
}

function updateAllUI() {
    // Actualizar Doughnut Chart (solo especies activas)
    doughnutChart.data.datasets[0].data = currentSpecies.filter(s => s.abundance > 0.05).map(s => s.abundance);
    doughnutChart.data.labels = currentSpecies.filter(s => s.abundance > 0.05).map(s => `${s.emoji} ${s.name}`);
    doughnutChart.update();
    
    // Actualizar Line Chart
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
    
    // Actualizar detalles y estado
    updateSpeciesDetails();
    updateBalanceStatus();
    updateRichness();
    monthCounter.textContent = month;
}

// --- SIMULATION LOGIC ---
function simulateMonth() {
    month++;
    const diet = dietSelect.value;
    // Usamos una copia de los valores actuales para calcular los cambios del mes
    const newAbundances = JSON.parse(JSON.stringify(currentSpecies)); 
    
    // 1. Calcular Factores Biológicos Cruzados (antes de aplicar la dieta)
    const fPrausnitziiAb = newAbundances.find(s => s.name === 'Faecalibacterium prausnitzii').abundance;
    const roseburiaAb = newAbundances.find(s => s.name === 'Roseburia spp.').abundance;
    const prevotellaAb = newAbundances.find(s => s.name === 'Prevotella copri').abundance;
    const bacteroidesAb = newAbundances.find(s => s.name === 'Bacteroides thetaiotaomicron').abundance;
    const akkermansia = newAbundances.find(s => s.name === 'Akkermansia muciniphila');
    const methanobrevibacter = newAbundances.find(s => s.name === 'Methanobrevibacter smithii');
    
    // Factor de Estabilidad del Butirato (aplica a Akkermansia)
    // Aumentamos el factor para que tenga más impacto
    const butyratoFactor = (fPrausnitziiAb + roseburiaAb) / 50; 
    
    // Factor de Hidrógeno para Metanógenos (Prevotella y Butirato-productores son buenos)
    // Aumentamos el factor para que tenga más impacto
    const hydrogenFactor = (prevotellaAb + fPrausnitziiAb + roseburiaAb) / 100; 

    // 2. Aplicar Dinámica Cruzada
    // Cooperación: Butirato ayuda a Akkermansia (moco).
    akkermansia.abundance += butyratoFactor * 1.5; // Mayor boost de butirato
    
    // Sintrofía: Metanógeno crece si hay Hidrógeno
    methanobrevibacter.abundance += hydrogenFactor * 1.5; // Mayor boost
    
    // Competencia: Prevotella vs. Bacteroides por Carbohidratos (ajuste negativo a Prevotella si Bacteroides domina)
    const carbCompetition = (bacteroidesAb - prevotellaAb) / 50; 
    if (carbCompetition > 0.5) { // Solo si Bacteroides es significativamente mayor
        newAbundances.find(s => s.name === 'Prevotella copri').abundance -= carbCompetition * 0.5;
    }


    // 3. Aplicar Efectos de Dieta y Metabolitos
    newAbundances.forEach(s => {
        let change = 0;
        let factor = 0; // El factor será el porcentaje de cambio (e.g., 0.15 = 15% de cambio)

        switch(diet) {
            case 'industrialized':
                if (s.type === 'beneficial') { factor = -0.15; } 
                if (s.name === 'Akkermansia muciniphila') { factor = -0.25; } 
                if (s.name.includes('Enterococcus faecalis')) { factor = 0.3; } 
                if (s.name.includes('Bilophila wadsworthia')) { factor = 0.4; } 
                break;

            case 'mediterranean':
                if (s.name === 'Faecalibacterium prausnitzii' || s.name === 'Roseburia spp.' || s.name === 'Prevotella copri') { factor = 0.35; } 
                else if (s.type === 'beneficial') { factor = 0.15; }
                
                // Polifenoles: fuerte inhibición de patógenos
                if (s.name === 'Fusobacterium nucleatum' || s.name === 'Clostridioides difficile') { factor = -0.3; }
                if (s.name === 'Bilophila wadsworthia') { factor = -0.4; } 
                break;

            case 'keto':
                if (s.name.includes('Bifido') || s.name.includes('Faecali') || s.name.includes('Roseburia') || s.name.includes('Prevotella')) { factor = -0.3; } 
                if (s.name.includes('Bilophila wadsworthia')) { factor = 0.6; } 
                if (s.type === 'opportunistic' && s.name !== 'Bilophila wadsworthia') { factor = 0.1; } 
                break;

            case 'vegan':
                if (s.name === 'Prevotella copri' || s.name.includes('Ruminococcus') || s.name.includes('Bifido')) { factor = 0.3; } 
                else if (s.type === 'beneficial') { factor = 0.15; }
                if (s.name === 'Bilophila wadsworthia' || s.name === 'Clostridium perfringens') { factor = -0.25; } 
                if (s.type === 'neutral') { factor = 0.05; }
                break;
        }

        // NUEVO CÁLCULO DE CAMBIO: Multiplicador directo de la abundancia
        change = s.abundance * factor; 
        s.abundance += change;
        
        // Ruido aleatorio para simular variabilidad
        s.abundance += (Math.random() - 0.5) * 0.5; // Aumentamos la magnitud del ruido
    });

    // 4. Aplicar Lógica de Extinción (Abundancia < 0.5%)
    newAbundances.forEach(s => {
        // Asegurar que ninguna especie sea negativa
        s.abundance = Math.max(0, s.abundance);

        if (s.abundance > 0 && s.abundance < 0.5) {
            // Aplicar una pequeña probabilidad de "extinción" si están en el umbral bajo
             if (Math.random() < 0.1) { // 10% de probabilidad de extinción en el umbral
                 s.abundance = 0;
             }
        }
    });
    
    // 5. Normalización Global
    const activeSpecies = newAbundances.filter(s => s.abundance > 0);
    const totalAbundance = activeSpecies.reduce((sum, s) => sum + s.abundance, 0);
    
    if (totalAbundance > 0) {
        const scaleFactor = 100 / totalAbundance;
        currentSpecies = newAbundances.map(s => ({
            ...s,
            abundance: s.abundance > 0 ? s.abundance * scaleFactor : 0,
        }));
    } else {
         // Si todas las especies se extinguieron, reiniciamos o manejamos el error (en este caso, mantendremos el estado)
        currentSpecies = newAbundances;
    }

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

async function callGeminiForAnalysis() {
    modalTitle.innerText = "✨ Análisis del Microbioma por IA";
    modalTextContent.innerHTML = '';
    modalTextContent.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    mealPlanSection.classList.add('hidden');
    mealPlanResponse.innerHTML = '';
    openModal();

    // Solo incluimos especies con abundancia detectable (> 0) en el prompt de IA
    const activeSpeciesData = currentSpecies.filter(s => s.abundance > 0);
    const speciesDataString = activeSpeciesData.map(s => `- ${s.name} (${s.role}): ${s.abundance.toFixed(1)}%`).join('\n');

    try {
        const response = await postToFunction('analyze', { speciesData: speciesDataString });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor: ${errorText}`);
            console.error(`Error del servidor: ${errorText}`);
        }

        const result = await response.json();

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
