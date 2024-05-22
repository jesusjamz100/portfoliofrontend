const formatDate = fecha => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-VE', {dateStyle: 'short'}).format(nuevaFecha);
};

export default formatDate;