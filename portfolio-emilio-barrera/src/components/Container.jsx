export default function Container({ children, className = '' }) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10 lg:px-12 ${className}`}>
            {children}
        </div>
    )
}
