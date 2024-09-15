export const handleTelInput = (entrada: string) => {
    entrada = entrada.replace(/\D/g, '');

    // Aplica a máscara de telefone (XX) XXXXX-XXXX
    if (entrada.length <= 2) {
        entrada = entrada.replace(/(\d{0,2})/, '($1');
    } else if (entrada.length <= 7) {
        entrada = entrada.replace(/(\d{0,2})(\d{0,5})/, '($1) $2');
    } else {
        entrada = entrada.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    }

    return entrada;
}

export const handleCpfInput = (entrada: string) => {
    entrada = entrada.replace(/\D/g, '');

    // Aplica a máscara de CPF xxx.xxx.xxx-xx
    if (entrada.length <= 3) {
        entrada = entrada.replace(/(\d{0,3})/, '$1');
    } else if (entrada.length <= 6) {
        entrada = entrada.replace(/(\d{0,3})(\d{0,3})/, '$1.$2');
    } else if (entrada.length <= 9) {
        entrada = entrada.replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
    } else {
        entrada = entrada.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
    }

    return entrada;
};

export const handleDataInput = (entrada: string) => {
    entrada = entrada.replace(/\D/g, '');

    // Aplica a máscara de data dd/MM/yyyy
    if (entrada.length <= 2) {
        entrada = entrada.replace(/(\d{0,2})/, '$1');
    } else if (entrada.length <= 4) {
        entrada = entrada.replace(/(\d{0,2})(\d{0,2})/, '$1/$2');
    } else {
        entrada = entrada.replace(/(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
    }

    return entrada;
};