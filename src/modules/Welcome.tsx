import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function Welcome() {
    const navigate = useNavigate();

    // Function to handle the start button click
    const handleStart = () => {
        navigate('/App');
    };

    return (
        <div
            // Container styles
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <img
                // Logo image
                src="Auxo.svg"
                alt="Logo"
                style={{
                    width: "30%",
                    height: "10%",
                    marginBottom: "10%",
                }}
            />
            <Button
                // Start button
                type="primary"
                onClick={handleStart}
                style={{
                    fontSize: "200%",
                    width: "10%",
                    height: "10%",
                    borderRadius: "10%",
                }}
            >
                Start
            </Button>
        </div>
    );
}
