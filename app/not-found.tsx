import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Container className="max-w-md text-center">
        <div className="space-y-6">
          <div className="text-6xl">🤔</div>

          <h1 className="text-2xl font-bold text-gray-900">Страница не найдена</h1>

          <p className="text-gray-600">
            Запрашиваемая страница не существует или была перемещена.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              🏠 На главную
            </Link>

            <div className="text-sm text-gray-500">
              <p>Или свяжитесь с нами:</p>
              <a href="tel:+79169905365" className="text-emerald-600 hover:text-emerald-700">
                📞 +7 (916) 990-53-65
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
