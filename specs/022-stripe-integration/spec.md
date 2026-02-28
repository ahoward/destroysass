# Feature Specification: Stripe Integration — Real Pledges

**Feature Branch**: `022-stripe-integration`
**Created**: 2026-02-22
**Status**: Draft (awaiting COO input on payment questions)
**Priority**: P0

> **Protocol**: Before working on this spec, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Summary

Connect Stripe to convert pledges from tracked commitments to real monthly subscriptions. When a user pledges to an idea, they go through Stripe Checkout to set up a real recurring payment. Subscriptions are cancelled on unpledge.

## User Scenarios & Testing

### User Story 1 - Pledge with Real Payment (Priority: P1)

A user pledges to an idea and is taken through Stripe Checkout to set up payment.

**Acceptance Scenarios**:

1. **Given** a logged-in user on an idea page, **When** they click pledge and enter an amount, **Then** they are redirected to Stripe Checkout
2. **Given** a user completing Stripe Checkout, **When** payment succeeds, **Then** they are redirected back to the idea page and see their pledge confirmed
3. **Given** a user completing Stripe Checkout, **When** payment fails, **Then** they see an error and can retry

### User Story 2 - Unpledge / Cancel Subscription (Priority: P1)

A user who has pledged can withdraw, which cancels their Stripe subscription.

**Acceptance Scenarios**:

1. **Given** a user with an active pledge, **When** they click withdraw, **Then** their Stripe subscription is cancelled
2. **Given** a cancelled subscription, **When** the idea page loads, **Then** the pledge is removed from the total

### User Story 3 - Stripe Webhooks (Priority: P1)

Stripe sends webhook events for payment successes, failures, and cancellations.

**Acceptance Scenarios**:

1. **Given** a successful monthly charge, **When** Stripe sends `invoice.paid`, **Then** the pledge remains active
2. **Given** a failed charge after retries, **When** Stripe sends `customer.subscription.deleted`, **Then** the pledge is marked inactive and removed from totals

## Requirements

### Functional Requirements

- **FR-001**: Stripe Checkout session created for each new pledge
- **FR-002**: Stripe customer created per user (stored in profiles table)
- **FR-003**: Stripe subscription ID stored on pledges table
- **FR-004**: Webhook endpoint at `/api/webhooks/stripe` validates Stripe signature
- **FR-005**: Unpledge cancels the Stripe subscription via API
- **FR-006**: Pledge totals only count active subscriptions
- **FR-007**: Environment variables: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

### Database Changes

- `profiles` table: add `stripe_customer_id` text column
- `pledges` table: add `stripe_subscription_id` text column, `stripe_status` text column (active/cancelled/past_due)

### Key Entities

- **Stripe Customer**: 1:1 with user profile
- **Stripe Subscription**: 1:1 with pledge
- **Stripe Product**: Single product "destroysaas pledge" with dynamic pricing

## Pending Decisions (from docs/business-questions.md)

These MUST be answered before implementation can proceed:
- Minimum pledge amount
- Platform fee (take rate)
- Receiving entity (determines Stripe account type)
- Refund policy on unpledge

## Success Criteria

- **SC-001**: User can pledge real money via Stripe Checkout
- **SC-002**: User can unpledge and subscription is cancelled
- **SC-003**: Webhook processes payment events correctly
- **SC-004**: Pledge totals reflect only active subscriptions
- **SC-005**: `./dev/health` passes
