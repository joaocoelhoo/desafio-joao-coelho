class CaixaDaLanchonete {

	calcularValorDaCompra(metodoDePagamento, itens) {
		// console.log(metodoDePagamento, itens)
		const strItensSplited = itens.map((item) => item.split(','));
		const foodCodigos = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];
		const paymentMethods = ["dinheiro", "debito", "credito"];
		
		const validItem = strItensSplited.every((item) =>
			foodCodigos.includes(item[0])
		);

		const invalidAmount = strItensSplited.some((item) => item[1] === "0");

		if (!paymentMethods.includes(metodoDePagamento)) {
			return "Forma de pagamento inválida!";
		} else if (itens.length === 0) {
			return "Não há itens no carrinho de compra!";
		} else if (invalidAmount) {
			return "Quantidade inválida!";
		} else if (!validItem) {
			return "Item inválido!";
		}
	}
}


export { CaixaDaLanchonete };
