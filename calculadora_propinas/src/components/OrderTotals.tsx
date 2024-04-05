import { useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderTotalsProp = {
	order: OrderItem[];
	tip: number;
	saveOrder: () => void;
};

const OrderTotals = ({ order, tip, saveOrder }: OrderTotalsProp) => {
	const subTotal = useMemo(
		() => order.reduce((total, item) => total + item.quantity * item.price, 0),
		[order]
	);

	const selectTip = useMemo(() => subTotal * tip, [tip, order]);
	const totalAmount = useMemo(() => subTotal + selectTip, [tip, order]);

	return (
		<>
			<div className="space-y-3">
				<h2 className="font-black text-2xl">Totales y Propina:</h2>
				<p>
					Subtotal a pagar:{" "}
					<span className="font-bold">{formatCurrency(subTotal)}</span>
				</p>
				<p>
					Propina:{" "}
					<span className="font-bold">{formatCurrency(selectTip)}</span>
				</p>
				<p>
					Total a pagar:{" "}
					<span className="font-bold">{formatCurrency(totalAmount)}</span>
				</p>
			</div>
			<button
				className="w-full bg-black text-white uppercase font-bold p
        mt-10 p-3 rounded-md disabled:opacity-20"
				disabled={totalAmount === 0}
				onClick={saveOrder}
			>
				Guardar Orden
			</button>
		</>
	);
};

export default OrderTotals;
