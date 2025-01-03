
export const filterCategories = (categories, role, hotel) => {
    return categories.filter((category) => {
        if (!category.role || category.role.includes(role)) {
            if (role === 'Administrador' && !hotel) {
                return category.name === 'Admin'
            }
            return true
        }
        return false
    })
}