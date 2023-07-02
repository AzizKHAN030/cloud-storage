 const extColor = {
    pdf: 'purple',
    doc: 'blue',
    xls: 'green',
    txt: 'blue',
    docx: 'blue',
    xlsx: 'green',
    ppt: 'red',
    pptx: 'red',
    jpg: 'orange',
    jpeg: 'orange',
    png: 'orange',
    gif: 'orange',
    svg: 'orange',
    zip: 'brown',
 } as const;

 export type Extension = keyof typeof extColor;
 export type Color = typeof extColor[Extension];

 export const getColorByExtension = (ext: Extension): Color => {
    return extColor[ext] || 'gray';
 }