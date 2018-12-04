

const cleanInputUsername = (inData) => {
    let data = inData.replace(" ", "");
    data = data.toLocaleLowerCase();
    return data;
}


export {cleanInputUsername};