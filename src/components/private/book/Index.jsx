import React from "react";

const ViewBookings = () => {
  // Dummy data for bookings
  const bookingsData = [
    {
      id: 1,
      customerName: "John Doe",
      busNumber: "BUS-101",
      route: "City A - City B",
      date: "2025-02-15",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      busNumber: "BUS-202",
      route: "City B - City C",
      date: "2025-02-14",
      time: "2:45 PM",
      status: "Cancelled",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      busNumber: "BUS-303",
      route: "City A - City D",
      date: "2025-02-16",
      time: "6:10 PM",
      status: "Pending",
    },
    {
      id: 4,
      customerName: "Bob Brown",
      busNumber: "BUS-404",
      route: "City C - City A",
      date: "2025-02-13",
      time: "9:00 AM",
      status: "Confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Booking Details</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Booking ID
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Customer Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Bus Number
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Route
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Date
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Time
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {booking.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {booking.customerName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {booking.busNumber}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {booking.route}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {booking.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {booking.time}
                  </td>
                  <td
                    className={`border border-gray-200 px-4 py-2 font-semibold ${
                      booking.status === "Confirmed"
                        ? "text-green-600"
                        : booking.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
