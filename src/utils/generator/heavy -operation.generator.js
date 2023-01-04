const calculateNumbers = (cant) => {
    const between = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const limitInf = 1;
    const limitSup = 1000;
    const salida = {};
    for (let i = 0; i < cant; i++) {
        const valor = between(limitInf,limitSup);
        if(salida[valor])   salida[valor] = salida[valor]+1;
        else                salida[valor] = 1;
    }
    return salida;
}
process.on('message', (msg) => {
    let sum
    if (msg) sum = calculateNumbers(msg);
    process.send(sum);

});