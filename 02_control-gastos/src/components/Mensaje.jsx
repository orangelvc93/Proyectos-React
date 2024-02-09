const Mensaje = ({ children, tipo }) => {
	/* #1.7 creamos el componente y le enviamos la variable alerta y creamos una variable dinámica "tipo" */
	return <div className={`alerta ${tipo}`}>{children}</div>;
};

export default Mensaje;
