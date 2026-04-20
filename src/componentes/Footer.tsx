type FooterProps = {
    total: number;
    completed: number;
};

function Footer({ total, completed }: FooterProps) {
    return (
        <div>
            <p>© 2026 Task Manager. Carlos Zarate.</p>
            <p>Total: {total} | Completadas: {completed}</p>
        </div>
    );
}

export default Footer;