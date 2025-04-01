import React from "react"

const UserList = ({ users, updateUser, updateCallback }) => {
    const onDelete = async (user_id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:10000/delete_user/${user_id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th>Role</th>               
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.user_id}>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => updateUser(user)}>Update</button>
                            <button onClick={() => onDelete(user.user_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default UserList