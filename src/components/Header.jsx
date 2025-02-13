import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='bg-blue-500 text-white p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<h1 className='text-xl font-bold'>
					<Link to='/'>AvtoVita</Link>
				</h1>
				<nav>
					<ul className='flex space-x-4'>
						<li>
							<Link to='/' className='hover:underline'>
								Home
							</Link>
						</li>
						<li>
							<Link to='/about' className='hover:underline'>
								About
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
