export const isDataValida = (data: string) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!regex.test(data)) {
        return false;
    }

    const [dia, mes, ano] = data.split('/').map(Number);

    if (mes < 1 || mes > 12) {
        return false;
    }

    if(mes == 2 && dia > 29) {
        return false;
    }

    const ultimoDiaMes = new Date(ano, mes, 0).getDate();
    if (dia < 1 || dia > ultimoDiaMes) {
        return false;
    }

    return true;
}