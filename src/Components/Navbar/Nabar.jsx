const Navbar = () => {
    return (
        <div className="ml-64 bg-white h-16 shadow flex items-center justify-between px-6 fixed w-full z-10">
            <div className="text-lg font-bold">Working Monitoring Dashboard</div>
            <div className="flex items-center space-x-4">
                <div className="text-gray-600">🔔</div>
                <div className="text-gray-600">👤 Admin</div>
            </div>
        </div>
    )
}

export default Navbar;