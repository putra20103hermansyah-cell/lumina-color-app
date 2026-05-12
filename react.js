const curated = [
    {
        id: 1,
        name: "Arctic Mist",
        colors: [
            '#f8fafc',
            '#f1f5f9',
            '#e2e8f0',
            '#94a3b8'
        ],
        names: [
            'Snow',
            'Frost',
            'Silver',
            'Slate'
        ],
        mood: 'Minimalist'
    },

    {
        id: 2,
        name: "Royal Indigo",
        colors: [
            '#312e81',
            '#4338ca',
            '#6366f1',
            '#a5b4fc'
        ],
        names: [
            'Deep',
            'Imperial',
            'Neon',
            'Lavender'
        ],
        mood: 'Creative'
    },

    {
        id: 3,
        name: "Cyber Neon",
        colors: [
            '#111827',
            '#4f46e5',
            '#ec4899',
            '#f43f5e'
        ],
        names: [
            'Dark',
            'Blue',
            'Pink',
            'Red'
        ],
        mood: 'Creative'
    }
];

let customVault = [];
let currentMood = 'All';

/* Mouse */
const blobs = [
    document.getElementById('blob-1'),
    document.getElementById('blob-2')
];

const cursorGlow =
    document.getElementById('cursor-glow');

const trail =
    document.getElementById('cursor-trail');

document.addEventListener('mousemove', (e) => {

    const {
        clientX: x,
        clientY: y
    } = e;

    cursorGlow.style.opacity = '1';

    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;

    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;

    blobs.forEach((b, i) => {

        const shift = (i + 1) * 20;

        b.style.transform =
            `translate(${x/shift}px, ${y/shift}px)`;
    });
});

/* Modal */
const openModal = (id) => {
    document.getElementById(id)
        .classList.add('modal-active');
};

const closeModal = (id) => {
    document.getElementById(id)
        .classList.remove('modal-active');
};

/* Card */
const createCard = (p) => `
<div class="liquid-glass p-3 flex flex-col h-[380px]">

    <div class="flex-1 flex flex-col gap-2 mb-4">

        <div class="flex-1 flex gap-2">

            <div class="color-block flex-1 rounded-2xl cursor-pointer relative"
                style="background:${p.colors[0]}"
                data-name="${p.names[0]}"
                onclick="copy('${p.colors[0]}')">
            </div>

            <div class="color-block flex-1 rounded-2xl cursor-pointer relative"
                style="background:${p.colors[1]}"
                data-name="${p.names[1]}"
                onclick="copy('${p.colors[1]}')">
            </div>

        </div>

        <div class="flex-1 flex gap-2">

            <div class="color-block flex-1 rounded-2xl cursor-pointer relative"
                style="background:${p.colors[2]}"
                data-name="${p.names[2]}"
                onclick="copy('${p.colors[2]}')">
            </div>

            <div class="color-block flex-1 rounded-2xl cursor-pointer relative"
                style="background:${p.colors[3]}"
                data-name="${p.names[3]}"
                onclick="copy('${p.colors[3]}')">
            </div>

        </div>
    </div>

    <div class="px-4 py-2 border-t border-slate-50">

        <h4 class="text-sm font-black text-slate-800">
            ${p.name}
        </h4>

        <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            ${p.mood}
        </p>

    </div>
</div>
`;

/* Render */
const renderLibrary = () => {

    const grid =
        document.getElementById('palette-grid');

    const filtered =
        curated.filter(
            p => currentMood === 'All'
            || p.mood === currentMood
        );

    grid.innerHTML =
        filtered.map(p => createCard(p)).join('');

    lucide.createIcons();
};

const renderMoods = () => {

    const moods = [
        'All',
        'Minimalist',
        'Creative'
    ];

    document.getElementById('mood-filters')
        .innerHTML = moods.map(m => `

        <button onclick="setMood('${m}')"
            class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
            ${currentMood === m
                ? 'bg-slate-900 text-white'
                : 'liquid-glass text-slate-400'}">

            ${m}
        </button>

    `).join('');
};

window.setMood = (m) => {

    currentMood = m;

    renderMoods();
    renderLibrary();
};

/* Save */
const saveCustomPalette = () => {

    const name =
        document.getElementById('cp-name').value
        || "Unnamed";

    const colors = [
        document.getElementById('cp-1').value,
        document.getElementById('cp-2').value,
        document.getElementById('cp-3').value,
        document.getElementById('cp-4').value
    ];

    customVault.unshift({
        id: Date.now(),
        name,
        colors,
        names: ['A','B','C','D'],
        mood: 'User'
    });

    closeModal('creator-modal');

    showToast(`Saved ${name}`);
};

/* Copy */
const copy = (c) => {

    navigator.clipboard.writeText(c);

    showToast(`Copied ${c}`);
};

/* Toast */
const showToast = (msg) => {

    const t =
        document.getElementById('toast');

    document.getElementById('toast-message')
        .textContent = msg;

    t.classList.add(
        'opacity-100',
        'translate-y-0'
    );

    setTimeout(() => {

        t.classList.remove(
            'opacity-100',
            'translate-y-0'
        );

    }, 3000);
};

/* Init */
window.onload = () => {

    renderMoods();
    renderLibrary();

    lucide.createIcons();
};