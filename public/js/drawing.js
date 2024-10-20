const toolBox = document.querySelector('ul.toolbox');
const modalContents = toolBox.querySelectorAll('span.toolbox-modal-content');

const rangeSelectorStrokeSize = toolBox.querySelector('input#stroke-size');
const pickerSelectorStrokeColor = toolBox.querySelector('input#stroke-color');

// needed for drawing on canvas
// used in camera.js
let strokeColor = "#00A870";
let strokeSize = 8;

 // needed for canvas drawing history
 // used in camera.js
 let history = [];
 let i = -1;

//-- toolbox actions with visual handling drawing history
const reset = () => { 
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height); 
    i = -1; 
};

const fillColor = () => { const [r,g,b] = ctx.getImageData(0,0,1,1).data; };

const doUndo = () => {
    if (i <= 0) return reset();
    i--;
    ctx.putImageData(history[i], 0, 0);
    fillColor(); 
};

const doRedo = () => {
    if (i >= history.length-1) return i = history.length-1;
    i++;
    ctx.putImageData(history[i],0,0);
    fillColor();
};

const doInit = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // start from the beginning
    history = [];
    i = -1; 
};

const doSave = () => doTakeAPhoto(); // same as take a photo functionality

// Todo: BUG - possibility to open 2 tooltips at same time 
toolBox.addEventListener("click", (event) => {

    const action = event.target;

    const modal = (type) => {
       const found = [...modalContents].find(el => el.id === type);
       found.classList.toggle('d-none');
    }
  
    action.matches('.tool-brush') && modal("brush");
    action.matches('.tool-palette') && modal("palette");
    action.matches('.tool-undo') && doUndo();
    action.matches('.tool-redo') && doRedo();
    action.matches('.tool-init') && doInit();
    action.matches('.tool-save') && doSave();
});

//-- event listeners for changing stroke size and color
rangeSelectorStrokeSize.addEventListener("change", (event) => {
    strokeSize = event.target.value;
});

pickerSelectorStrokeColor.addEventListener("change", (event) => {
    strokeColor = event.target.value;
});