"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  createBluetooth,
  isBluetoothError,
  type Bluetooth,
  type BluetoothCharacteristic,
  type BluetoothDevice,
} from "@0xsarwagya/agnostic-web-ble";
import { nativeWebBluetoothAdapter } from "@0xsarwagya/agnostic-web-ble/adapters/native";
import {
  createMockAdapter,
  type MockAdapter,
} from "@0xsarwagya/agnostic-web-ble/adapters/mock";

const BATTERY_SERVICE = "180f";
const BATTERY_LEVEL = "2a19";

type Log = { at: string; line: string };

function useLog() {
  const [entries, setEntries] = useState<Log[]>([]);
  const log = useCallback((line: string) => {
    setEntries((prev) => [
      ...prev.slice(-30),
      { at: new Date().toISOString().slice(11, 19), line },
    ]);
  }, []);
  return { entries, log };
}

/**
 * The same device logic, twice. Once against the mock adapter (works in any
 * runtime, no hardware), once against native Web Bluetooth (works where the
 * runtime supports it). That is the product.
 */
export default function Demo() {
  return (
    <div className="flex flex-col gap-16">
      <MockSection />
      <NativeSection />
    </div>
  );
}

async function readBattery(
  bluetooth: Bluetooth,
  log: (line: string) => void,
): Promise<{
  device: BluetoothDevice;
  characteristic: BluetoothCharacteristic;
}> {
  const adapter = await bluetooth.selectAdapter();
  log(`adapter selected: ${adapter.id}`);
  const device = await bluetooth.requestDevice({
    filters: [{ services: [BATTERY_SERVICE] }],
    optionalServices: [BATTERY_SERVICE],
  });
  log(`device: ${device.name ?? device.id}`);
  const connection = await device.connect();
  log("connected");
  device.on("disconnect", () => log("device disconnected"));
  const service = await connection.getPrimaryService(BATTERY_SERVICE);
  const characteristic = await service.getCharacteristic(BATTERY_LEVEL);
  const value = await characteristic.readValue();
  log(`battery level: ${value.getUint8(0)}%`);
  return { device, characteristic };
}

function describeFailure(error: unknown): string {
  if (isBluetoothError(error)) {
    return `${error.code} during ${error.operation}: ${error.message}`;
  }
  return error instanceof Error ? error.message : "unknown failure";
}

function MockSection() {
  const { entries, log } = useLog();
  const adapterRef = useRef<MockAdapter | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    try {
      const adapter = createMockAdapter({
        devices: [
          {
            id: "demo-sensor",
            name: "Demo Sensor",
            services: [
              {
                uuid: BATTERY_SERVICE,
                characteristics: [
                  {
                    uuid: BATTERY_LEVEL,
                    value: new Uint8Array([87]),
                    notifies: true,
                  },
                ],
              },
            ],
          },
        ],
      });
      adapterRef.current = adapter;
      const bluetooth = createBluetooth({ adapters: [adapter] });
      const { characteristic } = await readBattery(bluetooth, log);
      await characteristic.subscribe((value) =>
        log(`notification: battery ${value.getUint8(0)}%`),
      );
      log("subscribed to notifications");
    } catch (error) {
      log(describeFailure(error));
    } finally {
      setBusy(false);
    }
  };

  const drain = () => {
    const adapter = adapterRef.current;
    if (!adapter) return;
    const level = Math.max(1, Math.floor(Math.random() * 100));
    adapter.device("demo-sensor").notify(BATTERY_LEVEL, new Uint8Array([level]));
  };

  const drop = () => adapterRef.current?.device("demo-sensor").simulateDisconnect();

  return (
    <section>
      <h2 className="label">Mock adapter · works in this runtime</h2>
      <p className="mt-3 max-w-2xl font-body text-graphite" style={{ fontSize: 15, lineHeight: 1.55 }}>
        This runs the exact device logic below against a deterministic
        in-memory device. No hardware, no permissions.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <DemoButton onClick={run} disabled={busy} label="Connect & read battery" />
        <DemoButton onClick={drain} label="Push a notification" />
        <DemoButton onClick={drop} label="Simulate disconnect" />
      </div>
      <LogView entries={entries} />
    </section>
  );
}

function NativeSection() {
  const { entries, log } = useLog();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.resolve(nativeWebBluetoothAdapter().isAvailable()).then(
      setAvailable,
    );
  }, []);

  const run = async () => {
    setBusy(true);
    try {
      const bluetooth = createBluetooth({
        adapters: [nativeWebBluetoothAdapter()],
      });
      await readBattery(bluetooth, log);
    } catch (error) {
      log(describeFailure(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h2 className="label">Native Web Bluetooth · real hardware</h2>
      <p className="mt-3 max-w-2xl font-body text-graphite" style={{ fontSize: 15, lineHeight: 1.55 }}>
        The same code path against the runtime&apos;s own Web Bluetooth. It
        reads the standard battery service from any device that exposes one.
      </p>
      {available === false ? (
        <p className="mt-4 max-w-2xl border-l-2 border-rust/60 pl-4 font-body text-ink/80" style={{ fontSize: 15, lineHeight: 1.55 }}>
          This runtime cannot use the native Web Bluetooth adapter — the API
          is not exposed here. The mock adapter above still demonstrates the
          full journey; in a Chromium-based browser this section becomes
          interactive.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          <DemoButton
            onClick={run}
            disabled={busy || available !== true}
            label="Request a real device"
          />
        </div>
      )}
      <LogView entries={entries} />
    </section>
  );
}

function DemoButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border border-ink/25 px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-rust hover:text-rust disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function LogView({ entries }: { entries: Log[] }) {
  if (entries.length === 0) return null;
  return (
    <pre className="mt-6 max-h-64 overflow-auto border border-ink/10 bg-ink/[0.04] p-4 font-mono text-[12px] leading-relaxed">
      {entries.map((e) => `${e.at}  ${e.line}`).join("\n")}
    </pre>
  );
}
