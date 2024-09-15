export const convertDateFormat = (dateString : string) => {
    // Verifica se a string está no formato esperado (yyyy-mm-dd)
    if (/\d{4}-\d{2}-\d{2}/.test(dateString)) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    // Se o formato estiver incorreto, retorna a string original
    return dateString;
};