import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { PropertyProvider } from "../context/PropertyContext";
import App from "../App";
import React from "react";

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function () {};

// Helper to render App with required providers
const renderApp = () => {
  return render(
    <PropertyProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </PropertyProvider>
  );
};

describe("Estate Agent Application", () => {
  // Test 1: App Renders and Navbar exists
  it("renders the navbar and main heading", () => {
    renderApp();
    expect(screen.getByText(/rightmove/i)).toBeInTheDocument();
    expect(screen.getByText(/plus/i)).toBeInTheDocument();
  });

  // Test 2: Search Functionality - Filtering by Type
  it("filters properties based on type selection", async () => {
    const user = userEvent.setup();
    renderApp();

    // Find the Property type field's control and click it
    const typeLabel = screen.getByText("Property type");
    const typeControl = typeLabel.parentElement.querySelector(
      ".react-select__control"
    );
    await user.click(typeControl);

    // Wait for and click the specific option
    const option = await screen.findByText("Detached Bungalow");
    await user.click(option);

    const searchButton = screen.getByText(/Start Search/i);
    await user.click(searchButton);

    await waitFor(() => {
      // Now it should find Prop 7
      expect(
        screen.getByText(/Keswick Road, Cringleford/i)
      ).toBeInTheDocument();
      // Should NOT find Prop 3 (Flat)
      expect(
        screen.queryByText(/Parmenter Road, Norwich/i)
      ).not.toBeInTheDocument();
    });
  });

  // Test 3: Search Functionality - Price Range
  it("filters properties based on price range", async () => {
    const user = userEvent.setup();
    renderApp();

    // Find and click the Max Price (£) select
    const maxLabel = screen.getByText(/Max Price/i);
    const maxContainer = maxLabel.parentElement;
    const maxPriceControl = maxContainer.querySelector(
      ".react-select__control"
    );
    await user.click(maxPriceControl);
    // Type into the react-select input to filter options
    const maxInput = maxContainer.querySelector("input");
    await user.type(maxInput, "200000");

    const priceOption = await screen.findByText(/£200,000/i);
    await user.click(priceOption);

    const searchButton = screen.getByText(/Start Search/i);
    await user.click(searchButton);

    await waitFor(() => {
      // Prop 3 is 175k
      expect(screen.getByText(/Parmenter Road, Norwich/i)).toBeInTheDocument();
      // Prop 1 is 1.2m, should not show
      expect(screen.queryByText(/London, SW3/i)).not.toBeInTheDocument();
    });
  });

  // Test 4: Favorites Functionality - Add to list
  it("adds a property to favorites when heart icon is clicked", async () => {
    renderApp();

    // Find add buttons
    const addButtons = screen.getAllByTitle(/Add to favorites/i);
    fireEvent.click(addButtons[0]);

    // Check sidebar updates - button text is just "Clear"
    await waitFor(() => {
      expect(screen.getByText(/Saved \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText("Clear")).toBeInTheDocument();
    });
  });

  // Test 5: Favorites Functionality - Remove/Clear
  it("clears favorites when clear button is clicked", async () => {
    renderApp();

    const addButtons = screen.getAllByTitle(/Add to favorites/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Clear")).toBeInTheDocument();
    });

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
      expect(screen.queryByText("Clear")).not.toBeInTheDocument();
    });
  });

  // Test 6: Navigate to Property Page
  it("navigates to property details page when View Details is clicked", async () => {
    renderApp();

    const viewButtons = screen.getAllByText(/View Details/i);
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      // Check for element on PropertyPage
      expect(screen.getByText(/Back to search results/i)).toBeInTheDocument();
      expect(screen.getByText(/Key Features/i)).toBeInTheDocument();
    });
  });
});
