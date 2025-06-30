// Terminal Portfolio Script
const messages = [
    "Hey 👋",
    "I'm John.",
    "I work on the backend — APIs, databases, all that good stuff.",
    "The frontend's pretty minimal (on purpose 😅)",
    "But if you're curious, check this out: https://github.com/rafaeljohn9",
    "...still here? Okay, now I'm blushing 😳"
];

// DOM Elements
const terminalContent = document.getElementById('terminalContent');
const commandInput = document.getElementById('commandInput');
const statusText = document.getElementById('statusText');
const terminal = document.getElementById('terminal');
const matrixRain = document.getElementById('matrixRain');

// State Variables
let messageIndex = 0;
let isIntroComplete = false;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Available Commands
const commands = {
    help: () => {
        addTerminalLine('Available commands:', 'system');
        addTerminalLine('• help - Show this help message', 'info');
        addTerminalLine('• skills - Display technical skills', 'info');
        addTerminalLine('• projects - Show recent projects', 'info');
        addTerminalLine('• matrix - Toggle matrix rain effect', 'info');
        addTerminalLine('• hack - Initiate hacking sequence 😎', 'info');
        addTerminalLine('• clear - Clear terminal', 'info');
        addTerminalLine('• whoami - Display user info', 'info');
    },
    skills: () => {
        addTerminalLine('Technical Skills Loading...', 'system');
        setTimeout(() => {
            addTerminalLine('Backend: Node.js,Python, PostgreSQL, MongoDB', 'success');
            addTerminalLine('DevOps: Docker, AWS, CI/CD', 'success');
            addTerminalLine('Tools: Git, Linux, VS Code', 'success');
            addTerminalLine('Currently Learning: Rust, GraphQL', 'warning');
        }, 800);
    },
    projects: () => {
        addTerminalLine('Recent Projects:', 'system');
        setTimeout(() => {
            addTerminalLine('🚀 API Gateway - Microservices orchestration', 'success');
            addTerminalLine('📊 Analytics Dashboard - Real-time data processing', 'success');
            addTerminalLine('🔐 Auth Service - JWT & OAuth implementation', 'success');
        }, 600);
    },
    matrix: () => {
        toggleMatrix();
        addTerminalLine('Matrix rain effect toggled', 'success');
    },
    hack: () => {
        hackSequence();
    },
    clear: () => {
        clearTerminal();
    },
    whoami: () => {
        addTerminalLine('john', 'success');
        addTerminalLine('Backend Engineer | Problem Solver | Coffee Enthusiast', 'info');
    },
    sudo: () => {
        addTerminalLine('john is not in the sudoers file. This incident will be reported.', 'error');
        glitchEffect();
    }
};

// Core Functions
function enableInput() {
    commandInput.disabled = false;
    commandInput.focus();
    statusText.textContent = 'Interactive Mode';
}

function createTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <span class="typing-prompt">john@portfolio:~$</span>
        <span class="cursor"></span>
        <div class="typing-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    return typingDiv;
}

function createTerminalLine(text) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';

    let messageContent = text;
    if (text.includes('https://')) {
        const parts = text.split(' ');
        messageContent = parts.map(part => {
            if (part.startsWith('https://')) {
                return `<a href="${part}" target="_blank" rel="noopener noreferrer">${part}</a>`;
            }
            return part;
        }).join(' ');
    }

    lineDiv.innerHTML = `
        <span class="prompt">></span>
        <span class="command">${messageContent}</span>
    `;
    return lineDiv;
}

function addTerminalLine(text, type = 'normal') {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';

    let color = '#ffffff';
    let prompt = '>';

    switch (type) {
        case 'system': color = '#ffaa00'; prompt = '[SYSTEM]'; break;
        case 'success': color = '#00ff41'; prompt = '[OK]'; break;
        case 'error': color = '#ff4444'; prompt = '[ERROR]'; break;
        case 'warning': color = '#ffdd44'; prompt = '[WARN]'; break;
        case 'info': color = '#44ddff'; prompt = '[INFO]'; break;
    }

    lineDiv.innerHTML = `
        <span class="prompt" style="color: ${color}">${prompt}</span>
        <span class="command" style="color: ${color}">${text}</span>
    `;

    terminalContent.appendChild(lineDiv);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function typeMessage(text, element) {
    return new Promise((resolve) => {
        const commandSpan = element.querySelector('.command');
        commandSpan.innerHTML = '';
        let i = 0;

        function typeChar() {
            if (i < text.length) {
                commandSpan.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, 60 + Math.random() * 80);
            } else {
                if (text.includes('https://')) {
                    const parts = text.split(' ');
                    const finalContent = parts.map(part => {
                        if (part.startsWith('https://')) {
                            return `<a href="${part}" target="_blank" rel="noopener noreferrer">${part}</a>`;
                        }
                        return part;
                    }).join(' ');
                    commandSpan.innerHTML = finalContent;
                }
                resolve();
            }
        }

        typeChar();
    });
}

async function showNextMessage() {
    if (messageIndex >= messages.length) {
        isIntroComplete = true;
        enableInput();
        showEasterEgg('🎉', Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        return;
    }

    const currentMessage = messages[messageIndex];
    const isLastMessage = messageIndex === messages.length - 1;

    const typingIndicatorDelay = Math.max(1500, currentMessage.length * 30);
    const pauseAfterMessage = Math.max(1500, currentMessage.length * 25);

    const typingIndicator = createTypingIndicator();
    terminalContent.appendChild(typingIndicator);
    terminalContent.scrollTop = terminalContent.scrollHeight;

    const indicatorTime = isLastMessage ? typingIndicatorDelay * 2 : typingIndicatorDelay;

    setTimeout(async () => {
        if (typingIndicator.parentNode) {
            terminalContent.removeChild(typingIndicator);
        }

        const terminalLine = createTerminalLine('');
        terminalContent.appendChild(terminalLine);

        await typeMessage(currentMessage, terminalLine);

        terminalContent.scrollTop = terminalContent.scrollHeight;
        messageIndex++;

        if (messageIndex < messages.length) {
            setTimeout(showNextMessage, pauseAfterMessage);
        } else {
            setTimeout(() => {
                isIntroComplete = true;
                enableInput();
            }, 2000);
        }
    }, indicatorTime);
}

// Command Handling
function handleCommand(cmd) {
    const command = cmd.toLowerCase().trim();

    addTerminalLine(`john@portfolio:~$ ${cmd}`, 'normal');

    if (commands[command]) {
        commands[command]();
    } else if (command === '') {
        // Do nothing for empty command
    } else {
        addTerminalLine(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
    }
}

function clearTerminal() {
    const lines = terminalContent.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
        if (index > 0) { // Keep the first line (./introduce.sh)
            line.remove();
        }
    });
}

// Special Effects
function hackSequence() {
    addTerminalLine('Initiating hack sequence...', 'warning');
    statusText.textContent = 'HACKING...';

    const steps = [
        'Scanning network ports...',
        'Bypassing firewall...',
        'Accessing mainframe...',
        'Decrypting passwords...',
        'Downloading the internet...',
        'Access granted! 😎'
    ];

    steps.forEach((step, index) => {
        setTimeout(() => {
            addTerminalLine(step, index === steps.length - 1 ? 'success' : 'system');
            if (index === steps.length - 1) {
                statusText.textContent = 'HACKED';
                glitchEffect();
            }
        }, (index + 1) * 800);
    });
}

function toggleMatrix() {
    if (matrixRain.classList.contains('active')) {
        matrixRain.classList.remove('active');
        matrixRain.innerHTML = '';
    } else {
        matrixRain.classList.add('active');
        createMatrixRain();
    }
}

function createMatrixRain() {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    matrixRain.innerHTML = '';

    for (let i = 0; i < 30; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDelay = Math.random() * 2 + 's';
        column.style.animationDuration = (3 + Math.random() * 2) + 's';

        let columnText = '';
        for (let j = 0; j < 20; j++) {
            columnText += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = columnText;

        matrixRain.appendChild(column);
    }
}

function glitchEffect() {
    terminal.classList.add('glitch');
    setTimeout(() => terminal.classList.remove('glitch'), 300);
}

function showEasterEgg(emoji, x, y) {
    const easterEgg = document.createElement('div');
    easterEgg.className = 'easter-egg';
    easterEgg.textContent = emoji;
    easterEgg.style.left = x + 'px';
    easterEgg.style.top = y + 'px';
    document.body.appendChild(easterEgg);

    setTimeout(() => easterEgg.remove(), 2000);
}

// Terminal Button Functions
function closeTerminal() {
    addTerminalLine('Connection terminated by user', 'warning');
    glitchEffect();
}

function minimizeTerminal() {
    terminal.style.transform = 'scale(0.8)';
    setTimeout(() => terminal.style.transform = 'scale(1)', 300);
}

function maximizeTerminal() {
    terminal.style.transform = 'scale(1.05)';
    setTimeout(() => terminal.style.transform = 'scale(1)', 300);
}

// Event Listeners
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        commandInput.value = '';
        handleCommand(command);
    }
});

// Focus input when clicking anywhere in terminal content
terminalContent.addEventListener('click', () => {
    if (!commandInput.disabled) {
        commandInput.focus();
    }
});

// Konami code listener
document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        terminal.classList.add('konami-activated');
        addTerminalLine('🌈 KONAMI CODE ACTIVATED! 🌈', 'success');
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                showEasterEgg('🎮', Math.random() * window.innerWidth, Math.random() * window.innerHeight);
            }, i * 200);
        }
        konamiCode = [];
    }
});

// Initialize
setTimeout(showNextMessage, 2000);
