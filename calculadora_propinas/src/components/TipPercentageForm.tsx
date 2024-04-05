const tipOptions = [
	{
		id: "tip-0",
		value: 0,
		label: "0%",
	},
	{
		id: "tip-10",
		value: 0.1,
		label: "10%",
	},
	{
		id: "tip-30",
		value: 0.3,
		label: "30%",
	},
	{
		id: "tip-50",
		value: 0.5,
		label: "50%",
	},
];

type TipPercentageFormProps = {
	setTip: React.Dispatch<React.SetStateAction<number>>;
	tip: number;
};

const TipPercentageForm = ({ setTip, tip }: TipPercentageFormProps) => {
	return (
		<div>
			<h3 className="font-black text-2xl">Propina: </h3>
			<form>
				{tipOptions.map((tipOption) => (
					<div
						key={tipOption.id}
						className="flex gap-2"
					>
						<label htmlFor={tipOption.id}>{tipOption.label}</label>
						<input
							type="radio"
							id={tipOption.id}
							name="tip"
							value={tipOption.value}
							onChange={(e) => setTip(+e.target.value)}
							checked={tip === tipOption.value}
						/>
					</div>
				))}
			</form>
		</div>
	);
};

export default TipPercentageForm;
