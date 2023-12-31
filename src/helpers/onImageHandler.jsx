export const onImageHandler = (e, setFunction, nameProp) => {
    const imageMimeType = /image\/(png|jpg|jpeg)/i
    const file = e.target.files[0]
    const sizeFile = file?.size / 1000000
    if (file) {
        if (!file.type.match(imageMimeType) || sizeFile > 5) {
            setFunction(null)
        } else {
            nameProp ? setFunction((prevValues) => ({...prevValues, [nameProp]: file})) : setFunction(file)
        }
    }
}