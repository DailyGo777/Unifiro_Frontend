import PaymentHeader from "@/components/dashboard/PaymentHeader";

export default function PaymentsPage() {
    return (
        <PaymentHeader title="Payments">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>
            <p>View your payment history here.</p>
        </PaymentHeader>
    );
}
