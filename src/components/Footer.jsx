import {
  FaEnvelope,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-white  text-gray-700 py-12 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Логотип и описание */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <img src="/logo.png" alt="AvtoVita Logo" className="w-32" />
          <p className="text-sm text-gray-600">
            Ваш надежный партнер по покупке автомобилей из Южной Кореи. Мы
            предлагаем широкий выбор машин и гарантируем честные цены.
          </p>
        </div>

        {/* Быстрые ссылки */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Быстрые ссылки
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Главная
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-600 hover:text-red-500 transition"
              >
                О компании
              </a>
            </li>
            <li>
              <a
                href="/catalog"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Каталог автомобилей
              </a>
            </li>
            <li>
              <a
                href="/contacts"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Контакты
              </a>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Контакты</h2>
          <p className="text-sm text-gray-600">
            Ким Евгений:{" "}
            <a
              href="tel:+821042252627"
              className="text-gray-600 hover:text-red-500 transition"
            >
              +82 (10)-4225-2627
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Югай Виталий:{" "}
            <a
              href="tel:+821093441782"
              className="text-gray-600 hover:text-red-500 transition"
            >
              +82 (10)-9344-1782
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Ким Константин:{" "}
            <a
              href="tel:+821093441782"
              className="text-gray-600 hover:text-red-500 transition"
            >
              +82 (10)-9344-1782
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Пак Сергей:{" "}
            <a
              href="tel:+821093441782"
              className="text-gray-600 hover:text-red-500 transition"
            >
              +82 (10)-2473-5718
            </a>
          </p>
        </div>

        {/* Социальные сети */}
        <div className="text-center md:text-right">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Мы в соцсетях
          </h2>
          <div className="flex justify-center md:justify-end gap-4 text-2xl">
            <a
              href="https://wa.me/821012345678"
              className="text-green-500 hover:text-green-600 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://t.me/avtovita"
              className="text-blue-500 hover:text-blue-600 transition"
            >
              <FaTelegram />
            </a>
            <a
              href="https://instagram.com/avtovita"
              className="text-pink-500 hover:text-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/avtovita"
              className="text-red-500 hover:text-red-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Линия разделитель */}
      <hr className="my-6 border-gray-200" />

      {/* Копирайт */}
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AvtoVita. Все права защищены.
      </div>
    </footer>
  )
}

export default Footer
