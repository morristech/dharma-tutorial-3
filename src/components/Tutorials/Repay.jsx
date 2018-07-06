import React, { Component } from "react";

import { Button } from "../Button/Button";

import { debtorAddress } from "../../constants";

export default class Repay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasAllowedRepayments: false
        };

        this.handleAllowRepayments = this.handleAllowRepayments.bind(this);
        this.handleMakeRepayment = this.handleMakeRepayment.bind(this);
    }

    async handleAllowRepayments(event) {
        event.preventDefault();

        const { debtOrder } = this.props;

        await debtOrder.allowRepayments(debtorAddress);

        this.setState({ hasAllowedRepayments: true });
    }

    async handleMakeRepayment(event) {
        event.preventDefault();

        const { debtOrder, updateBlockchainStatus } = this.props;

        await debtOrder.makeRepayment();

        // TODO: await txn mined

        await updateBlockchainStatus();
    }

    render() {
        const { debtOrder, isDebtOrderFilled, isDebtOrderRepaid } = this.props;
        const { hasAllowedRepayments } = this.state;

        const disableAllowRepayments = !debtOrder || !isDebtOrderFilled || hasAllowedRepayments;
        const disableMakeRepayment = !hasAllowedRepayments || isDebtOrderRepaid;

        return (
            <div className="RepayTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Make Repayments</h3>
                </header>

                <Button
                    disabled={disableAllowRepayments}
                    label={"Allow Repayments"}
                    onClick={this.handleAllowRepayments}
                />

                <Button disabled={disableMakeRepayment} label={"Make a Repayment"} onClick={this.handleMakeRepayment} />
            </div>
        );
    }
}
