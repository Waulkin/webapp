import { useState } from "react";

const UserForm = ({ existingUser = {}, updateCallback }) => {
    const [role, setRole] = useState(existingUser.role || "");
    const [email, setEmail] = useState(existingUser.email || "");

    const updating = Object.entries(existingUser).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            role,
            email
        }
        const url = "https://webapp-ldfa.onrender.com/" + (updating ? `update_user/${existingUser.user_id}` : "create_user")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default UserForm