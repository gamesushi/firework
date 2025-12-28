// 简化版的自定义对话框替换函数
// 将这些函数添加到 script.js 文件的开头，在使用之前

// 替代 prompt 的异步函数
async function customPrompt(message, defaultValue = '') {
    const dialog = document.querySelector('.custom-dialog');
    const header = document.querySelector('.custom-dialog__header');
    const input = document.querySelector('.custom-dialog__input');
    const cancelBtn = document.querySelector('.custom-dialog__btn--cancel');
    const confirmBtn = document.querySelector('.custom-dialog__btn--confirm');

    return new Promise((resolve) => {
        header.textContent = message;
        input.value = defaultValue;
        input.style.display = 'block';
        dialog.classList.add('active');
        input.focus();
        input.select();

        const cleanup = (value) => {
            dialog.classList.remove('active');
            cancelBtn.removeEventListener('click', handleCancel);
            confirmBtn.removeEventListener('click', handleConfirm);
            input.removeEventListener('keypress', handleKeypress);
            resolve(value);
        };

        const handleCancel = () => cleanup(null);
        const handleConfirm = () => cleanup(input.value);
        const handleKeypress = (e) => {
            if (e.key === 'Enter') cleanup(input.value);
            if (e.key === 'Escape') cleanup(null);
        };

        cancelBtn.addEventListener('click', handleCancel);
        confirmBtn.addEventListener('click', handleConfirm);
        input.addEventListener('keypress', handleKeypress);
    });
}

// 替代 confirm 的异步函数
async function customConfirm(message) {
    const dialog = document.querySelector('.custom-dialog');
    const header = document.querySelector('.custom-dialog__header');
    const input = document.querySelector('.custom-dialog__input');
    const cancelBtn = document.querySelector('.custom-dialog__btn--cancel');
    const confirmBtn = document.querySelector('.custom-dialog__btn--confirm');

    return new Promise((resolve) => {
        header.textContent = message;
        input.style.display = 'none';
        dialog.classList.add('active');
        confirmBtn.focus();

        const cleanup = (value) => {
            dialog.classList.remove('active');
            input.style.display = 'block';
            cancelBtn.removeEventListener('click', handleCancel);
            confirmBtn.removeEventListener('click', handleConfirm);
            resolve(value);
        };

        const handleCancel = () => cleanup(false);
        const handleConfirm = () => cleanup(true);

        cancelBtn.addEventListener('click', handleCancel);
        confirmBtn.addEventListener('click', handleConfirm);
    });
}
