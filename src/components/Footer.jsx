const Footer = () => {
	return (
		<footer className='bg-gray-800 text-white p-4'>
			<div className='container mx-auto text-center'>
				&copy; {new Date().getFullYear()} AvtoVita. Все права защищены.
			</div>
		</footer>
	)
}

export default Footer
