export function statement(invoice, plays) {
	let result = `청구내역 (고객명: ${invoice.customer})\n`;
	const usd = (aNumber) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
			.format(aNumber / 100)
	}

	const playFor = (aPerformance) => {
		return plays[aPerformance.playID];
	}

	const amountFor = (aPerformance) => {
		let result = 0;
		switch (playFor(aPerformance).type) {
			case 'tragedy':
				result = 40000;

				if (aPerformance.audience > 30) {
					result += 1000 * (aPerformance.audience - 30);
				}
				break;
			case 'comedy':
				result = 30000;

				if (aPerformance.audience > 20) {
					result += 10000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;

			default:
				throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
		}
		return result
	}

	const volumeCreditsFor = (aPerformance) => {
		let volumeCredits = 0
		volumeCredits += Math.max(aPerformance.audience - 30, 0);

		if ('comedy' === playFor(aPerformance).type) {
			volumeCredits += Math.floor(aPerformance.audience / 5);
		}
		return volumeCredits;
	}

	const totalVolumeCredits = () => {
		let result = 0;
		for (let perf of invoice.performances) {
			result += volumeCreditsFor(perf);
		}
		return result
	}

	const totalAmount = () => {
		let result = 0;
		for (let perf of invoice.performances) {
			result += amountFor(perf);
		}
		return result
	}

	for (let perf of invoice.performances) {
		// 청구 내역을 출력한다.
		result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
	}

	result += `총액 ${usd(totalAmount())}\n`;
	result += `적립 포인트 ${totalVolumeCredits()}점\n`;

	return result;
}
