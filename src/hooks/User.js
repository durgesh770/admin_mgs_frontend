const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
}

export {
    handleLogout
}