"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Profile.css';
import Dropzone from 'react-dropzone';

export default function Profile() {
    const cookieValue = Cookies.get('usuario');
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({});
    const [empresa, setEmpresa] = useState({});
    const [profileUpdated, setProfileUpdated] = useState(false);

    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch(`http://localhost:1080/api/usuarios/${cookieValue}`, {
                  method: 'GET',

              });
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setUser(data);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };
  
      const fetchEmpresaData = async () => {
          try {
              const response = await fetch(`http://localhost:1080/api/empresas/${cookieValue}`, {
                  method: 'GET',
              });
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setEmpresa(data);
          } catch (error) {
              console.error('Error fetching empresa data:', error);
          }
      };
  
      fetchUserData();
      fetchEmpresaData();
      setProfileUpdated(false);
  }, [cookieValue, profileUpdated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = { ...user, direccion: empresa.direccion, telefono: empresa.telefono, tipo: empresa.tipo };

        try {
            const response = await fetch(`http://localhost:1080/api/usuario_editar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                alert('Profile updated successfully');
                const data = await response.json();
                setUser(data);
                setProfileUpdated(true); 
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                const response = await fetch(`http://localhost:1080/api/eliminar_usuario/${cookieValue}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Account deleted successfully');
                } else {
                    const errorData = await response.json();
                    alert(`Error deleting account: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Error deleting account');
            }
        }
    };

    return (
        <React.Fragment>
            <div className="profile-container">
                <h2 className='poppins-light text-2xl'>Tu perfil de empresa</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="profile-field">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={user.nombre || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <br />
                    <div className="profile-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <br />
                    <div className="profile-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <br />
                    <div className="profile-field">
                        <label>Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={empresa.direccion || ''}
                            onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <br />
                    <div className="profile-field">
                        <label>Telefono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={empresa.telefono || ''}
                            onChange={(e) => setEmpresa({ ...empresa, telefono: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <br />
                    <div className="profile-field">
                        <label>Tipo</label>
                        <input
                            type="text"
                            name="tipo"
                            value={empresa.tipo || ''}
                            onChange={(e) => setEmpresa({ ...empresa, tipo: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <br />
                    <button type="button" onClick={handleEditToggle}>
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                    {isEditing && <button type="submit">Save</button>}
                </form>
                <br />
                <button className="delete-button" onClick={handleDeleteAccount}>
                    <p className='poppins-regular'>Eliminar tu cuenta</p>
                </button>
            </div>
        </React.Fragment>
    );
}
