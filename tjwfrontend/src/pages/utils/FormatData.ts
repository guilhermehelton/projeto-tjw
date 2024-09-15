export const convertDateFormat = (dateString: string) => {
    // Verifica se a string está no formato esperado (yyyy-mm-dd)
    if (/\d{4}-\d{2}-\d{2}/.test(dateString)) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    // Se o formato estiver incorreto, retorna a string original
    return dateString;
};

export const serializeStringToLocalDate = (dateString: string) => {
    // Verifica se a string está no formato esperado (dd/mm/yyyy)
    if (/\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    }

    // Se o formato estiver incorreto, retorna a string original
    return dateString;
}