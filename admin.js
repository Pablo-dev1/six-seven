document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admin-login-form');
    const usernameInput = document.getElementById('admin-username');
    const passwordInput = document.getElementById('admin-password');
    const message = document.getElementById('admin-message');
    const dashboard = document.getElementById('admin-dashboard');
    const authSection = document.querySelector('.auth-page');
    const authCard = document.getElementById('auth-card');
    const logoutButton = document.getElementById('logoutButton');

    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'senha123'
    };

    const resetLogin = () => {
        if (authSection) {
            authSection.classList.remove('hidden');
        }
        authCard.classList.remove('hidden');
        dashboard.classList.add('hidden');
        message.textContent = '';
        usernameInput.value = '';
        passwordInput.value = '';
    };

    const chartInstances = {};

    const createChart = (canvas, config) => {
        return canvas ? new Chart(canvas, config) : null;
    };

    const createCharts = () => {
        const chartConfigs = {
            finance: {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        {
                            label: 'Receita',
                            data: [42000, 48000, 52000, 50000, 56000, 62000],
                            borderColor: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.14)',
                            borderWidth: 3,
                            tension: 0.35,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#ccc' } },
                        y: { grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#ccc' } }
                    }
                }
            },
            clients: {
                type: 'bar',
                data: {
                    labels: ['Ativos', 'Inativos', 'Novos', 'Potenciais'],
                    datasets: [
                        {
                            label: 'Clientes',
                            data: [314, 68, 27, 92],
                            backgroundColor: ['#7a7d8f', '#9aa0b6', '#b3b9d8', '#d1d4e8']
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#ccc' } },
                        y: { grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#ccc', beginAtZero: true } }
                    }
                }
            },
            reports: {
                type: 'pie',
                data: {
                    labels: ['Vendas', 'Marketing', 'Operações'],
                    datasets: [
                        {
                            data: [45, 25, 30],
                            backgroundColor: ['#d6d6e0', '#9fa3ba', '#6f7588']
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom', labels: { color: '#ccc' } } }
                }
            },
            support: {
                type: 'doughnut',
                data: {
                    labels: ['Resolvidos', 'Abertos', 'Em Progresso'],
                    datasets: [
                        {
                            data: [64, 18, 18],
                            backgroundColor: ['#d6d6e0', '#9aa0b6', '#7e849a']
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom', labels: { color: '#ccc' } } }
                }
            }
        };

        ['finance', 'clients', 'reports', 'support'].forEach((type) => {
            const overviewCanvas = document.getElementById(`${type}Chart`);
            const tabCanvas = document.getElementById(`${type}ChartTab`);

            if (overviewCanvas) {
                chartInstances[`${type}Overview`] = createChart(overviewCanvas, chartConfigs[type]);
            }

            if (tabCanvas) {
                chartInstances[`${type}Tab`] = createChart(tabCanvas, chartConfigs[type]);
            }
        });
    };

    const setActiveTab = (tabId) => {
        const tabButtons = document.querySelectorAll('.sidebar-link[data-tab]');
        const chartTabs = document.querySelectorAll('.chart-tab');

        tabButtons.forEach((button) => {
            if (button.dataset.tab === tabId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        chartTabs.forEach((tab) => {
            if (tab.id === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        const tabChart = chartInstances[`${tabId}Tab`];
        if (tabChart) {
            tabChart.resize();
            tabChart.update();
        }
    };

    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.sidebar-link[data-tab]');

        tabButtons.forEach((button) => {
            button.addEventListener('click', () => {
                setActiveTab(button.dataset.tab);
            });
        });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            message.textContent = 'Login realizado com sucesso! Carregando painel...';
            message.classList.add('success');
            message.classList.remove('error');
            if (authSection) {
                authSection.classList.add('hidden');
            }
            authCard.classList.add('hidden');
            dashboard.classList.remove('hidden');
            createCharts();
            initTabs();
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            message.textContent = 'Credenciais inválidas. Verifique usuário e senha.';
            message.classList.add('error');
            message.classList.remove('success');
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            resetLogin();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});