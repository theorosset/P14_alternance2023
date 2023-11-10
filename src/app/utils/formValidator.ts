interface formData {
    [key: string]: string;
}

export function formValidator(data: formData) {
    const inputInvalid: string[] = [];

    Object.entries(data).forEach(([key, value]) => {
        if(!value.trim()) {
            inputInvalid.push(key)
        }
    })

    return inputInvalid
}

