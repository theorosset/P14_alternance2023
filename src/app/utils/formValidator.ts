interface formData {
    [key: string]: string;
}

export function formValidator(data: formData, step?: string) {
    const inputInvalid: string[] = [];

    //check if data are not empty or valide 
    Object.entries(data).forEach(([key, value]) => {

        if(!value.trim()) {
            inputInvalid.push(key)
        }

        if(key === "zipcode" && !inputInvalid.includes('zipcode')) {
            const regexpZipCode = /^\d{5}$/;
            if(!regexpZipCode.test(value)) {
                inputInvalid.push(key)
            }
        }
    })

    return inputInvalid
}

