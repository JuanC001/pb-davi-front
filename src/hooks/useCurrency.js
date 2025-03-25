export const useCurrency = () => {
    const formatter = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
    }

    return {
        formatter
    }
}