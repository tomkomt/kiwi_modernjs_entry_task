export const EMIT_EVENT = 'EMIT_EVENT';
export function emitEvent(event) {
    return {
        type: EMIT_EVENT,
        event: event
    }
}