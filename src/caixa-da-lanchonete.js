import { Product } from './product.js';

class CaixaDaLanchonete {
	constructor() {
		this.menu = [
			new Product("cafe", "Café", "R$ 3,00"), 
			new Product("chantily", "Chantily (extra do Café)", "R$ 1,50", "cafe"),
			new Product("suco", "Suco Natural", "R$ 6,20"),
			new Product("sanduiche", "Sanduíche", "R$ 6,50"),
			new Product("queijo", "Queijo (extra do Sanduíche)", "R$ 2,00", "sanduiche"),
			new Product("salgado", "Salgado", "R$ 7,25"),
			new Product("combo1", "1 Suco e 1 Sanduíche", "R$ 9,50"),
			new Product("combo2", "1 Café e 1 Sanduíche", "R$ 7,50"),
		];
		this.paymentMethods = ["dinheiro", "debito", "credito"];
	}

	validarCompra(itens, metodoDePagamento) {
		const validItem = itens.every((item) =>
			this.menu.find((product) => product.code === item[0])
		);

		const invalidAmount = itens.some((item) => item[1] === "0");
		
		if (!this.paymentMethods.includes(metodoDePagamento)) {
			return "Forma de pagamento inválida!";
		} else if (itens.length === 0) {
			return "Não há itens no carrinho de compra!";
		} else if (invalidAmount) {
			return "Quantidade inválida!";
		} else if (!validItem) {
			return "Item inválido!";
		}
	};
	
	validarExtras(extraProducts, itens) {
		const itensCodes = itens.map((item) => item[0]);
		const validExtra = extraProducts.every((product) =>
			itensCodes.includes(product.principal)
		);
	
		if (!validExtra) {
			return "Item extra não pode ser pedido sem o principal";
		}
	};

	calcularPagamento(metodoDePagamento, totalPrice) {
		let result;

		switch (metodoDePagamento) {
			case "credito":
				const priceWithFee = totalPrice + (totalPrice/100)*3;
				result = `R$ ${priceWithFee.toFixed(2)}`
				return result.replace(".", ",");
			case "dinheiro":
				const priceWithDiscount = totalPrice - (totalPrice/100)*5;
				result = `R$ ${priceWithDiscount.toFixed(2)}`
				return result.replace(".", ",");
			default:
				result = `R$ ${totalPrice.toFixed(2)}`
				return result.replace(".", ",");
		}
	}
	
	calcularValorDaCompra(metodoDePagamento, itens) {
		const strItensSplited = itens.map((item) => item.split(','));
		
		const invalid = this.validarCompra(strItensSplited, metodoDePagamento);
		if (invalid) return invalid;

		const products = strItensSplited.map((item) => this.menu.find((product) => product.code === item[0]));
		const extraProducts = products.filter((product) => product.principal);
		const productsPrice = products.map((product) => { 
			const item = strItensSplited.find((item) => item[0] === product.code);
			const price = product.getValue() * item[1]
			return price;
		})
		const totalPrice = productsPrice.reduce((acc, curr) => acc + curr, 0);
		
		const invalidExtras = this.validarExtras(extraProducts, strItensSplited);
		if (invalidExtras) return invalidExtras;
		
		return this.calcularPagamento(metodoDePagamento, totalPrice);
	}
}


export { CaixaDaLanchonete };
