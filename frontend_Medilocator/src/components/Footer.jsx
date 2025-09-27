export default function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-dark-green text-white">
      <div className="container">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-teal">
              Privacy Policy
            </a>
          </li>
          <li className="nav-item ">
            <a href="#" className="nav-link px-2  text-teal">
              Terms & Conditions
            </a>
          </li>
          <li className="nav-item ">
            <a href="#" className="nav-link px-2  text-teal">
              Feedback
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-teal">
              FAQs
            </a>
          </li>
        </ul>
        <p className="text-center mb-0 text-teal">© 2025 Company, Medilocator</p>
      </div>
    </footer>
  );
}
